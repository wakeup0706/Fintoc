const fs = require('fs');
const path = require('path');
const { transporter } = require('../config/email.config');

async function sendResetEmail(to, resetLink) {
  try {
    const templatePath = path.resolve(__dirname, '../template/reset.password.html');

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found at path: ${templatePath}`);
    }

    let html = fs.readFileSync(templatePath, 'utf-8');
    html = html.replace(/{{RESET_LINK}}/g, resetLink);

    await transporter.sendMail({
      from: '"Gestiona" <Gestionasoftware2025@gmail.com>',
      to,
      subject: 'Reset your password',
      html,
    });

    console.log(`Reset email sent to: ${to}`);
  } catch (error) {
    console.error('Failed to send reset email:', error.message);
    throw error; // Let the calling function handle the response
  }
}

// need to use Kickbox r NeverBounce to validate fake, risk and invalid email

module.exports = { sendResetEmail };
