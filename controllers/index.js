// index file to gather the routes to export to the server
// Dependencies
// Server Connection
const router = require('express').Router();
// Api route folder
const apiRoutes = require('./api');
// Homepage routes
const homeRoutes = require('./homeRoutes');
// Shelf routes
const shelfRoutes = require('./shelfRoutes');


// Define the path for the server for the API routes
router.use('/api', apiRoutes);

// Define the path for the home page
router.use('/', homeRoutes);

// Define the path for the shelf
router.use('/shelf', shelfRoutes);

// Define a catch-all route for any resource that doesn't exist
router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;
