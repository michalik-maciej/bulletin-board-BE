const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user successfully authenticated',
      user: req.user,
    })
  }
})

router.get('/login/failure', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'user failed to authenticate',
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_HOMEPAGE_URL)
})

router.get('/google', 
  passport.authenticate('google', { 
    scope: ['email', 'profile'] 
  })
)

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/google',
  }),
  (req, res) => {

    res.redirect(process.env.CLIENT_HOMEPAGE_URL);
  }
);

module.exports = router;
