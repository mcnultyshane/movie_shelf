const router = require('express').Router();
const { Movie, User, Shelf } = require('../models');
const withAuth = require('../utils/auth');

// a route to render the user's shelf page when the user is logged in
router.get('/', withAuth, async (req, res) => {
    try {
        const shelfData = await Shelf.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'created_at'
            ],
            include: [{
                model: Movie,
                attributes: ['id', 'title', 'overview', 'poster_path', 'genreId', 'release_date', 'popularity', 'shelf_id', 'watched', 'on_deck'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
        });
        const shelves = shelfData.map((data) => data.get({
            plain: true
        }));

        res.render('shelf', {
            shelves,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// a route to view the user's qrcode??
// a route to view the search page