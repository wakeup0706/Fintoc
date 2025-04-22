const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
};

passport.use(new Strategy(options, async (payload, done) => {
  try {
    // Find the user by ID and include their associated role
    const user = await db.User.findByPk(payload.id, {
      include: {
        model: db.Role,
        as: 'role', // Include the user's role association
      },
    });

    if (user) {
      return done(null, user); // Successfully found the user, pass the user object
    } else {
      return done(null, false); // No user found
    }
  } catch (err) {
    return done(err, false); // Error occurred while retrieving user
  }
}));
