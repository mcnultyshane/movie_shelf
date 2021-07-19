const router = require('express').Router();
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const shelfRoutes = require('./shelf-routes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/shelves', shelfRoutes);




module.exports = router;
