const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword, verifyPassword } = require('../utils/hash');
const { sendResetEmail, sendPermissionEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
  const { email, password, first_name } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Correo electrónico ya en uso' });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Get default role
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      return res.status(500).json({ message: 'No se encontró el rol predeterminado' });
    }
    // Create new user
    const newUser = await User.create({
      email,
      password: hashed,
      first_name,
      last_name: '',
      roleId: defaultRole.id,
    });

    // Sign token using newUser instead of req.user
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Include user role in response
    const userWithRole = await User.findByPk(newUser.id, {
      include: { model: Role, as: 'role' },
    });

    res.json({ token, user: userWithRole });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' }
    });

    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const valid = await verifyPassword(password, user.password);

    if (!valid) return res.status(400).json({ message: 'Credenciales inválidas' });

    if (!user.allowed) {
      return res.status(400).json({ message: 'Deberías obtener permiso de acceso', redirectUrl: `${process.env.FRONTEND_URL}/allow` });
    }

    if (user.google_id) {
      return res.status(400).json({ message: 'Esta cuenta utiliza el inicio de sesión de Gmail' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, first_name: user.first_name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.sendPermissionRequest = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Se requiere correo electrónico.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Update the 'allowed' field to true
    user.allowed = true;
    await user.save();

    const { error } = await sendPermissionEmail(email);
    if (error) {
      throw new Error(error.message || 'Email service failed');
    }

    return res.status(200).json({ message: 'Permiso concedido exitosamente.' });
  } catch (error) {
    console.error('Error en la actualización del permiso:', error);
    return res.status(500).json({ message: 'Error Interno del Servidor.' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (!email) {
      return res.status(400).json({ message: 'Se requiere correo electrónico' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.google_id) {
      return res.status(400).json({ message: 'Esta cuenta utiliza el inicio de sesión de Google' });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || 'reset-secret',
      { expiresIn: '15m' }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const { error } = await sendResetEmail(email, resetLink);
    if (error) {
      throw new Error(error.message || 'Email service failed');
    }

    return res.status(200).json({ message: 'Enlace de restablecimiento de contraseña enviado a su correo electrónico.' });
  } catch (err) {
    console.error('Error al restablecer contraseña:', err);
    return res.status(500).json({
      message: 'Error al enviar el correo electrónico de restablecimiento de contraseña.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'reset-secret');
    const user = await User.findOne({ where: { email: decoded.email } });
    console.log(user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await hashPassword(password);
    await user.save();

    res.json({ message: 'La contraseña se ha restablecido correctamente' });
  } catch (err) {
    res.status(400).json({ message: 'Token inválido o caducado' });
  }
};
