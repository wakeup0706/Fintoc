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
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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


app.get("/", (req, res) => {
    res.send("start server!");
})

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
    .catch(err => console.error('DB connection failed:', err));

app.listen(PORT, () => console.log('start server!'));
