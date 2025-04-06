// functions/send-email-api.js
// Uses Nodemailer to send email via SMTP

import nodemailer from 'nodemailer';

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
    console.log("Preparing email data for Nodemailer...");
    const mailOptions = {
      from: `"Northern Spark Website" <${process.env.SMTP_USER || 'noreply@example.com'}>`, // Sender address (use configured SMTP user or a default)
      to: "northernsparkstudio@gmail.com", // List of receivers
      replyTo: `"${data.name}" <${data.email}>`, // Reply-to address
      subject: data.subject || `New message from ${data.name} via Northern Spark website`, // Subject line
      html: `
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
      ` // html body
    };
    console.log("Nodemailer mailOptions prepared.");

    // Check for required SMTP environment variables
    console.log("Checking for SMTP environment variables...");
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
    const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
    if (missingEnvVars.length > 0) {
        const message = `Missing required SMTP environment variables: ${missingEnvVars.join(', ')}`;
        console.error(message);
        throw new Error(message); // Throw error to be caught below
    }
    console.log("SMTP environment variables found.");

    // Create a transporter object using the default SMTP transport
    console.log("Creating Nodemailer transporter...");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10), // Ensure port is a number
      secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });
    console.log("Nodemailer transporter created.");

    // Send mail with defined transport object
    console.log("Attempting to send email via Nodemailer (SMTP)...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Successfully sent email via Nodemailer.");
    console.log("Nodemailer Message sent: %s", info.messageId);
    // console.log("Nodemailer Preview URL: %s", nodemailer.getTestMessageUrl(info)); // Only available when using ethereal.email

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
// Removed Brevo-specific makeRequest helper function
