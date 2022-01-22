const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model')

// configure passport provider options
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_ID,
  clientSecret: process.env.GOOGLE_AUTH_SECRET,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {

  /* find current user in database */
  try {
    const currentUser = await User.findOne({ 
      googleId: profile._json.sub
     })

    /* create new user in dabatase if user not found */
    if (!currentUser) {
      const { sub, email, name } = profile._json
      const newUser = await new User({
        googleId: sub,
        role: 'user',
        email,
        name,
      }).save()
      if (newUser) {
        done(null, newUser)
      }
    }

    done(null, currentUser);
  }
  catch (err) {
    throw new Error('user not found in database', err)
  }
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});
