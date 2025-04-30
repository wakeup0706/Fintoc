const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  if (!req.user) return res.status(401).send('Authentication failed');

  const token = jwt.sign({ id: req.user.id, email: req.user.email, first_name: req.user.first_name }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '1d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // res.status(200).json({
  //   token,
  //   user: {
  //     id: req.user.id,
  //     email: req.user.email,
  //     first_name: req.user.first_name,
  //     last_name: req.user.last_name,
  //     roleId: req.user.roleId,
  //   },
  // });

  res.redirect(`https://fintoc-oa6c-beta.vercel.app/profile?token=${token}`);
});

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        roleId:req.user.roleId,
      },
    });
  } else {
    res.status(401).json({ success: false });
  }
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;