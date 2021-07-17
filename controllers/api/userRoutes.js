const router = require('express').Router();
const {
    User,
    Shelf,
    Movie
} = require('../../models');
const withAuth = require('../../utils/auth')

// Get /api/users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        res.json(userData)
    } catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

// Get/api/users
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Shelf,
                    attributes: ['id', 'user_id']
                },
                {
                    model: Movie,
                    attributes: ['id', 'title', 'overview', 'poster_path', 'genreId', 'release_date', 'popularity', 'shelf_id', 'watched', 'on_deck'],
                    include: {
                        model: Shelf,
                        attributes: ['user_id']
                    }
                }
            ]
        })
        if (!userData) {
            res.status(404).json({
                message: 'No user found with this Id.'
            });
            return;
        }
        res.json(userData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,

        })
        // set up sessions with a 'loggedIn' variable set to 'true'
            req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json(userData)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res
                .status(400)
                .json({
                    message: 'Incorrect username or password, please try again'
                });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({
                    message: 'Incorrect email or password, please try again'
                });
            return;
        }
        // Once the user successfully logs in, set up the sessions variable 'loggedIn
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({
                user: userData,
                message: 'You are now logged in!'
            });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('logout', (req, res) => {
    // destroy session when user logs out.
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})


module.exports = router;