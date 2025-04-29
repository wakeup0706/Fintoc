const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();

const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const googleRoutes = require('./routes/google.routes');

require('./config/google');
require('./config/jwt');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://fintoc.vercel.app' : 'http://localhost:3000', // Adjust to production URL
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Specify allowed headers
  preflightContinue: false, // Ensure preflight requests are handled by Express
  optionsSuccessStatus: 204, // Handle legacy browsers' issues
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Body Parsing Middleware
app.use(cookieSession({
  name: 'authSession',
  keys: [process.env.SESSION_KEY || 'secret'],
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use('/auth', authRoutes);
app.use('/auth/google', googleRoutes);

// Database connection and server startup
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running');
    });
  })
  .catch(err => console.error('DB connection failed:', err));

// Handle preflight (OPTIONS) requests
app.options('*', cors());
