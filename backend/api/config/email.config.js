const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  // Should now be smtp-relay.sendinblue.com
  port: process.env.SMTP_PORT,  // Ensure port 587 for TLS
  secure: false,  // Use false because we're using port 587 (TLS)
  auth: {
    user: process.env.SMTP_USER,  // Your Brevo username
    pass: process.env.SMTP_KEY,   // Your Brevo SMTP key
  },
});

module.exports = { transporter };

