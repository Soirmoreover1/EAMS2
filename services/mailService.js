const nodemailer = require('nodemailer');
const { User } = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const sendResetPasswordEmail = async (user, token) => {
  const resetPasswordLink = 'http://your-app-url/reset-password/${token}';
  const mailOptions = {
    from: 'your-email-address@gmail.com',
    to: user.email,
    subject: 'Reset your password',
    text: `Hi ${user.username},\n\nPlease click on the following link to reset your password: ${resetPasswordLink}\n\nThis link will expire in 1 hour.`
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendResetPasswordEmail
};