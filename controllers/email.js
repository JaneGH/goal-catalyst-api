const { sendEmail } = require('../services/mailjetService');

const sendEmailController = async (req, res) => {
  const { toEmail, textContent } = req.body;

  try {
    const result = await sendEmail({
      fromEmail: process.env.EMAIL,
      toEmail: toEmail, 
      fromName: 'Goal catalyst',
      subject: 'Step into Your Next Goal!',
      textContent: textContent || "You’ve just set a new goal in the Goal Catalyst app! This is your chance to take on new challenges",
    });
    res.status(200).json({ message: 'Email sent successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = { sendEmailController };
