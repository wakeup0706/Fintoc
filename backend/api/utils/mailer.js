const { Resend } = require('resend'); // Correctly destructure Resend from the module
const resend = new Resend(process.env.RESEND_API_KEY || 'resend-api-key'); // Use the correct variable name

async function sendResetEmail(to, resetLink) {
  return await resend.emails.send({
    from: 'Gestiona <noreply@gestiona.io>', // ✅ verified domain
    to,
    subject: 'Password Reset Request',
    html: `<p>Haga clic en el enlace para restablecer su contraseña: <a href="${resetLink}">${resetLink}</a></p>`,
  });
}


async function sendPermissionEmail(to) {
  return await resend.emails.send({
    from: 'Gestiona <noreply@gestiona.io>', // ✅ verified domain
    to,
    subject: 'Tu correo electrónico ha sido guardado',
    html: `<p>Tu correo electrónico se ha guardado en nuestra base de datos. Te avisaremos cuando esté disponible.</p>`,
  });
}

module.exports = {
  sendResetEmail,
  sendPermissionEmail
};
