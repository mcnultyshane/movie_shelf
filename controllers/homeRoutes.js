const router = require('express').Router();
const { Movie, User, Shelf } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage
router.get('/', async (req, res) => {
  res.render('homepage');
});

// router.get('/', async (req, res) => {
//   res.render('homepage');
// });



// render the login page --> if the user is logged in, redirect to the homepage.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');


    return;
  }

  res.render('login');

})

// render the signup page --> if the user is logged in, redirect to the homepage.
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});



module.exports = router;

