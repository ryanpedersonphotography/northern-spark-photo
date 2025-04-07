const SibApiV3Sdk = require('@sendinblue/client');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Ensure API key is set in environment variables
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY environment variable not set.');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error.' }) };
  }

  try {
    // Parse the incoming form data
    const { name, email, subject, phone, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !email || !subject || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields.' }) };
    }

    // Initialize Brevo API client
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // Construct the email
    sendSmtpEmail.sender = { name: "Northern Spark Photography Contact Form", email: "noreply@northernspark.co" }; // Use authenticated domain
    sendSmtpEmail.to = [{ email: "northernsparkstudio@gmail.com" }]; // Your notification email
    sendSmtpEmail.replyTo = { email: "northernsparkstudio@gmail.com" }; // Where replies should go
    sendSmtpEmail.subject = `New Contact Form Submission: ${subject}`;
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </body>
      </html>
    `;
    // Optional: Set a text version for email clients that don't support HTML
    sendSmtpEmail.textContent = `
      New Contact Form Submission:
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Subject: ${subject}
      Message: ${message}
    `;


    // Send the email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" })
    };

  } catch (error) {
    console.error('Error sending email:', error.response ? JSON.stringify(error.response.body) : error);
    // Return a generic error message to the client
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message. Please try again later." })
    };
  }
};
