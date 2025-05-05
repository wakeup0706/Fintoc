const { Resend } = require('resend'); // Correctly destructure Resend from the module
const resend = new Resend(process.env.RESEND_API_KEY || 'resend-api-key'); // Use the correct variable name

async function sendResetEmail(to, resetLink) {
  return await resend.emails.send({
    from: 'Gestiona <noreply@gestiona.io>', // ✅ verified domain
    to,
    subject: 'Password Reset Request',
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  });
}


module.exports = { sendResetEmail };
