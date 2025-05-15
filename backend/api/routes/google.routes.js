const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_SUBSCRIPTION_REDIRECT_URI
);

router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  if (!req.user) return res.status(401).send('Authentication failed');

  if (!req.user.allowed) {
    return res.redirect(`${process.env.FRONTEND_URL}/allow`);
  }

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

  return res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
});

router.get('/connect/google-email', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
  });
  res.redirect(authUrl);
});

router.get('/subscription/callback', (req, res) => {
  console.log('subscription');
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