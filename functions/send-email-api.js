// functions/send-email-api.js
// This is an alternative implementation using Brevo's API instead of SMTP

import https from 'https';

export const handler = async (event, context) => {
  console.log(`\n--- Function Invoked ---`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Request Method: ${event.httpMethod}`);
  console.log(`Request Path: ${event.path}`);
  // console.log(`Request Headers: ${JSON.stringify(event.headers)}`); // Uncomment for detailed header debugging

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.warn(`Method Not Allowed: ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed. Please use POST.' })
    };
  }

  let data;
  try {
    // Parse the body
    console.log("Attempting to parse request body...");
    if (!event.body) {
        console.error("Request body is empty or undefined.");
        return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Request body is missing.' }) };
    }
    data = JSON.parse(event.body);
    console.log("Successfully parsed request body.");
    // console.log("Parsed Data:", JSON.stringify(data, null, 2)); // Log parsed data for debugging

    // Validate required fields
    console.log("Validating required fields...");
    const requiredFields = ['name', 'email', 'message']; // Subject is optional based on form
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      const message = `Missing required fields: ${missingFields.join(', ')}`;
      console.error("Validation Error:", message);
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: message })
      };
    }
    console.log("Required fields validation passed.");

    // Prepare the data for Brevo API
    console.log("Preparing data for Brevo API...");
    const brevoData = {
      sender: {
        name: "Northern Spark Website", // Or use data.name if preferred
        email: "noreply@northernspark.co" // IMPORTANT: Ensure this sender is verified in Brevo
      },
      to: [
        {
          email: "northernsparkstudio@gmail.com",
          name: "Northern Spark Studio"
        }
      ],
      replyTo: {
        email: data.email,
        name: data.name
      },
      subject: data.subject || `New message from ${data.name} via Northern Spark website`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong><br>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #777; margin-top: 30px; font-size: 0.8em;">
            This message was sent from the contact form on Northern Spark website
          </p>
        </div>
      `
    };
    console.log("Brevo API data prepared.");

    // Send the request to Brevo API
    console.log("Attempting to send email via Brevo API...");
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.error("BREVO_API_KEY environment variable is not set.");
        // Optionally use fallback for local testing, but log a warning
        // const fallbackApiKey = 'xkeysib-40a5744b12cba907e8a02423935439621ace2aae50a';
        // console.warn("Using hardcoded fallback API key for testing. DO NOT use in production.");
        // apiKey = fallbackApiKey;
        // If no fallback desired:
        throw new Error("Brevo API key is missing. Set BREVO_API_KEY environment variable.");
    }

    const response = await makeRequest(brevoData, apiKey);
    console.log("Successfully sent email via Brevo API.");
    // console.log("Brevo API Response:", response); // Log Brevo's success response if needed

    // Return success response
    console.log("Returning success response to client.");
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };

  } catch (error) {
    // Log detailed error information
    console.error('--- ERROR SENDING EMAIL ---');
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error("Error Type:", error.name);
    console.error("Error Message:", error.message);
    // console.error("Error Stack:", error.stack); // Uncomment for full stack trace
    if (data) {
        console.error("Data at time of error:", JSON.stringify(data, null, 2));
    } else {
        console.error("Data parsing might have failed earlier.");
    }
    console.error('---------------------------');


    // Return a more informative error response
    return {
      statusCode: 500, // Or potentially a more specific code if identifiable
      body: JSON.stringify({
        success: false,
        message: 'An internal server error occurred while sending the email.',
        // Provide a sanitized error message. Avoid exposing sensitive details.
        errorDetail: error.message || 'Unknown error'
      })
    };
  }
};

// Helper function to make the API request
function makeRequest(data, apiKey) {
  console.log("Executing makeRequest helper function...");
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      }
    };
    console.log("Brevo API Request Options:", JSON.stringify(options, null, 2));
    // console.log("Brevo API Request Body:", JSON.stringify(data, null, 2)); // Log request body if needed

    const req = https.request(options, (res) => {
      let responseBody = '';
      console.log(`Brevo API Response Status Code: ${res.statusCode}`);
      // console.log(`Brevo API Response Headers: ${JSON.stringify(res.headers)}`);

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        console.log("Brevo API Response Body:", responseBody);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log("Brevo API request successful.");
          resolve(responseBody);
        } else {
          console.error(`Brevo API request failed with status ${res.statusCode}.`);
          // Attempt to parse error response from Brevo
          let errorMessage = `Brevo API Error (${res.statusCode})`;
          try {
            const errorData = JSON.parse(responseBody);
            errorMessage += `: ${errorData.message || responseBody}`;
          } catch (parseError) {
            errorMessage += `: ${responseBody}`; // Use raw response if not JSON
          }
          console.error("Parsed Error Message:", errorMessage);
          reject(new Error(errorMessage));
        }
      });
    });

    req.on('error', (error) => {
      console.error('HTTPS Request Error:', error.message);
      reject(new Error(`Network or request error: ${error.message}`));
    });

    // Send the data
    console.log("Writing data to Brevo API request...");
    req.write(JSON.stringify(data));
    req.end();
    console.log("Brevo API request sent.");
  });
}
