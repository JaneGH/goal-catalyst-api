const { sendEmail } = require('../services/mailjetService');

const sendEmailController = async (req, res) => {
  const { toEmail, textContent } = req.body;

  try {
    const result = await sendEmail({
      fromEmail: 'jkrytsyna@gmail.com',
      toEmail: toEmail, // Use the email from the request
      subject: 'GO',
      textContent: textContent || "You have new task to do!", // Use provided textContent or a default message
    });
    res.status(200).json({ message: 'Email sent successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = { sendEmailController };
