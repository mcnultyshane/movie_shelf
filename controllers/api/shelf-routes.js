
const router = require('express').Router();
const { User,Shelf } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const shelfData = await Shelf.create({
            user_id: req.session.user_id
        })
        res.json(shelfData)
     // if there was a server error, return the error
    }  catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

module.exports = router;