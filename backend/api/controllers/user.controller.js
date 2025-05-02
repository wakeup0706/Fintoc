const { User, Role } = require('../models');
const { hashPassword, verifyPassword } = require('../utils/hash');

exports.getProfile = async (req, res) => {
    try {
      const user = req.user;
      res.json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role?.name,
        allowed: user.allowed,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
  };

  exports.updateProfile = async (req, res) => {
    const { first_name, last_name, current_password, new_password } = req.body;

    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (new_password) {
        if (!current_password) {
          return res.status(400).json({ message: 'Current password is required to change password' });
        }

        const valid = await verifyPassword(current_password, user.password);
        if (!valid) {
          return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = await hashPassword(new_password);
      }

      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;

      await user.save();

      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Update failed', error: err.message });
    }
  };
