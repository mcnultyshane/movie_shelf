const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const shelfRoutes = require('./shelfRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.unsubscribe('/shelf', shelfRoutes);

module.exports = router;
