const router = require('express').Router();
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
// router.use('/my-shelf', shelfRoutes);




module.exports = router;
