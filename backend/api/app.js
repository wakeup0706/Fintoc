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
const adminRoutes = require('./routes/admin.route');

require('./config/google');
require('./config/jwt');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight support

// ✅ Parse cookies and JSON
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Cookie session
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'defaultsecret'],
  maxAge: 24 * 60 * 60 * 1000, // 1 day
}));

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/google', googleRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Server started here!');
});

// ✅ Sequelize DB Sync
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('DB connection failed:', err);
});
