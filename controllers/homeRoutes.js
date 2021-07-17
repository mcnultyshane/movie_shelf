const router = require('express').Router();
const { Movie, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage');
});

// Temorary location for testing out Movie API Calls
router.get('/api-test', async (req, res) => {
  res.render('apiCall');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
