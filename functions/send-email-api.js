// functions/send-email-api.js
// This is an alternative implementation using Brevo's API instead of SMTP

const https = require('https');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the body
    const data = JSON.parse(event.body);

    // Validate required fields (name, email, message are required by the form)
    // Subject is optional in the form, so we don't strictly require it here
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Missing required fields: name, email, or message' })
      };
    }

    // Prepare the data for Brevo API
    const brevoData = {
      sender: {
        name: "Northern Spark Website", // Or use data.name if preferred
        email: "noreply@northernspark.co" // Replace with a verified sender email in Brevo if possible
      },
      to: [
        {
          // IMPORTANT: Replace with your actual email address
          email: "your-email@example.com",
          // IMPORTANT: Replace with your name or company name
          name: "Northern Spark Photography"
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

    // Send the request to Brevo API
    // IMPORTANT: Replace hardcoded API key with environment variable in production
    const apiKey = process.env.BREVO_API_KEY || 'xkeysib-40a5744b12cba907e8a02423935439621ace2aae50a'; // Fallback for local testing if needed
    const response = await makeRequest(brevoData, apiKey);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };

  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error sending email',
        error: error.message // Provide error details for debugging
      })
    };
  }
};

// Helper function to make the API request
function makeRequest(data, apiKey) {
  return new Promise((resolve, reject) => {
    // Prepare the request options
    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      }
    };

    // Create the request
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(responseBody);
        } else {
          // Attempt to parse error response from Brevo
          try {
            const errorData = JSON.parse(responseBody);
            reject(new Error(`API request failed with status ${res.statusCode}: ${errorData.message || responseBody}`));
          } catch (parseError) {
            reject(new Error(`API request failed with status ${res.statusCode}: ${responseBody}`));
          }
        }
      });
    });

    // Handle errors
    req.on('error', (error) => {
      reject(new Error(`Request error: ${error.message}`));
    });

    // Send the data
    req.write(JSON.stringify(data));
    req.end();
  });
}
