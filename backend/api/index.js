const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const db = require('../models');  // Adjust if necessary
const authRoutes = require('../routes/auth.routes');
const googleRoutes = require('../routes/google.routes');

require('../config/google');
require('../config/jwt');

const app = express();

// CORS configuration
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieSession({
  name: 'authSession',
  keys: [process.env.SESSION_KEY || 'secret'],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/auth/google', googleRoutes);

// Database connection and serverless export
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => console.error('DB connection failed:', err));

// Only listen locally (don't listen in Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app; // Export the app for Vercel serverless function
