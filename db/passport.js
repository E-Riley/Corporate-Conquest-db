const { Strategy, ExtractJwt } = require('passport-jwt');

require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  module.exports = (passport) => {
    passport.use(
      new Strategy(options, async (jwt_payload, done) => {
        try {
          const user = await db.query('SELECT id, username FROM users WHERE id = $1', [jwt_payload.id]);
          if (user.rows.length > 0) {
            return done(null, user.rows[0]);
          }
          return done(null, false);
        } catch (err) {
          return done(err, false);
        }
      })
    );
  };