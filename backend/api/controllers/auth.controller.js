const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword, verifyPassword } = require('../utils/hash');
const { sendResetEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
  const { email, password, first_name } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Get default role
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      return res.status(500).json({ message: 'Default role not found' });
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
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' }
    });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await verifyPassword(password, user.password);

    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.allowed) res.redirect(`http://localhost:3000/allow`);
    if (user.google_id) res.status(400).json({ message: 'This account uses Gmail login' });

    const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '1d',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.sendPermissionRequest = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the 'allowed' field to true
    user.allowed = true;
    await user.save();

    return res.status(200).json({ message: 'Permission granted successfully.' });
  } catch (error) {
    console.error('Permission update failed:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.google_id) {
      return res.status(400).json({ message: 'This account uses Google login' });
    }

    const token = jwt.sign(
      { email },
      process.env.RESET_PASSWORD_SECRET || 'reset-secret',
      { expiresIn: '15m' }
    );

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    const { error } = await sendResetEmail(email, resetLink);
    if (error) {
      throw new Error(error.message || 'Email service failed');
    }

    return res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error('Error in password reset:', err);
    return res.status(500).json({
      message: 'Failed to send password reset email.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET || 'reset-secret');
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await hashPassword(password);
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
