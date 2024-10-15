const mailjet = require('node-mailjet').apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

const sendEmail = async ({ fromEmail, fromName, toEmail, subject, textContent }) => {
  try {
    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName
            },
            To: [
              {
                Email: toEmail
              }
            ],
            Subject: subject,
            TextPart: textContent, // Plain text version of the email content
          }
        ]
      });
    const result = await request;
    return result.body;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };