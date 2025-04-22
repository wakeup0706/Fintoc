const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Role } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        as: 'role', // Include the user's role
      }
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) return res.status(500).json({ message: 'Default role not found' });

    const [user] = await User.findOrCreate({
      where: { google_id: profile.id },
      defaults: {
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        roleId: defaultRole.id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
