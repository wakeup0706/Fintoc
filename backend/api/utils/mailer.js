const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-brevo-email@example.com',
    pass: 'your-smtp-key-from-brevo',
  },
});

async function sendResetEmail(to, resetLink) {
  await transporter.sendMail({
    from: '"Your App" <your-brevo-email@example.com>',
    to,
    subject: 'Reset your password',
    html: `<p>Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>This link will expire in 15 minutes.</p>`,
  });
}

module.exports = { sendResetEmail };
