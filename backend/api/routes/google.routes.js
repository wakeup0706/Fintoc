const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { google } = require("googleapis");
const { extractEmailText, extractAmount, extractFrequency, extractName, guessCategory } = require('../controllers/google.controller');

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

  if (!req.user.allowed || req.user.allowed === null ) {
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

router.get('/subscription/callback', async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(401).json({ message: 'Missing auth code' });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const { data } = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 20,
      q: 'has:list-unsubscribe',
    });

    const messages = data.messages || [];
    const subscriptions = [];

    for (const msg of messages) {
      const fullMsg = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full',
      });

      const headers = fullMsg.data.payload?.headers || [];
      const subject = headers.find(h => h.name === 'Subject')?.value || '';
      const from = headers.find(h => h.name === 'From')?.value || '';
      const date = headers.find(h => h.name === 'Date')?.value || '';

      // Extract body text from payload
      const body = extractEmailText(fullMsg.data.payload);

      // Parse structured info
      const amount = extractAmount(body);
      const frequency = extractFrequency(body);
      const category = guessCategory(from, subject, body);
      const subscriptionName = extractName(from, subject);

      subscriptions.push({
        subscriptionName,
        amount,
        date,
        category,
        frequency,
        rawFrom: from,
        rawSubject: subject,
      });

      // TODO: Save each to DB here
      // await SubscriptionModel.create({ ... });
    }
    console.log('Subscriptions:', subscriptions);
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    return res.status(500).json({ message: 'Error fetching subscription data' });
  }
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

