const router = require('express').Router();
const { Movie, User, Shelf } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage');
});

router.get('/', async (req, res) => {
    
        res.render('apiCall');
      });

module.exports = router;