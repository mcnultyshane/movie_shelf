const router = require('express').Router();
const { User, Shelf, Movie } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

router.get('/key', async (req, res) => {
  try {
    const apiKey = process.env.DB_API;
    res.json(apiKey);
  } catch (err) {
    console.log(err);
    res.status(500).json.err;
  }
});
// Get /api/users -- get all users
router.get('/', async (req, res) => {
  try {
    // access the user model and run .findAll() method to get all users
    const userData = await User.findAll({
      attributes: {
        // sent back data excludes password property
        exclude: ['password'],
      },
    });
    // return data in JSON format
    res.json(userData);
    // if server error, return the error
  } catch (err) {
    console.log(err);
    res.status(500).json.err;
  }
});

// Get/api/users/1 -- get a single user by id
router.get('/:id', async (req, res) => {
  try {
    // Access the User model and run the findOne() method to get a single user based on parameters
    const userData = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        // use id as parameter for request
        id: req.params.id,
      },
      include: [
        {
          // include the user's shelf, and the movies on their shelf
          model: Shelf,
          attributes: ['id', 'user_id'],
        },
        {
          model: Movie,
          attributes: [
            'id',
            'title',
            'overview',
            'poster_path',
            'genre_id',
            'release_date',
            'popularity',
            'shelf_id',
            'watched',
            'on_deck',
          ],
          include: {
            model: Shelf,
            attributes: ['user_id'],
          },
        },
      ],
    });
    if (!userData) {
      res.status(404).json({
        message: 'No user found with this Id.',
      });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


  

// POST /api/users -- add a new User
router.post('/signup', async (req, res) => {
  try {
    // create method
    // expects an object in form {username: 'example', password: 'passwordExample'}
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    const shelfData = await Shelf.create({
      user_id: userData.id,
    });
    console.log(userData.id);

    // set up sessions with a 'loggedIn' variable set to 'true' and send back user data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.shelf_id = shelfData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData);
      res.json(shelfData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route for the user -->/api/users/login
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

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }
    // Once the user successfully logs in, set up the sessions variable 'loggedIn
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({
        user: userData,
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// POST /api/users/logout -- log out an existing user

router.post('/logout', (req, res) => {
    // destroy session when user logs out.
    if (req.session.loggedIn) {
        console.log(req.session.loggedIn);
        req.session.destroy(() => {
            // 204 status is that a request has succeeded, but client does not need to go to a different page
            // (200 indicates success and that a newly updated page should be loaded, 201 is for a resource being created)
            res.status(204).end();
        });
    } else {
        // if there is no session, then the logout request will send back a no resource found status
        res.status(404).end();
    }
})

// DELETE /api/users/1 -- delete an existing user
router.delete('/:id', withAuth, async (req, res) => {
  console.log('here');
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json('No User found with this id.');
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
