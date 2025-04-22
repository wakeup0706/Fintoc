const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword, verifyPassword } = require('../utils/hash');

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

    const token = jwt.sign({ id: req.user.id, email: req.user.email, first_name: req.user.first_name }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '1d',
    });
    console.log({ token, user });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
