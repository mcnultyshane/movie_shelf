
const router = require('express').Router();
const { User, Movie, Shelf, Genre } = require('../../models');
const withAuth = require('../../utils/auth');

require('dotenv').config();
// const APIkey = process.env.TMDB_AUTH
// var requestUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' +APIkey+ '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';

router.get('/search', async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.render('search');
  });

// GET api/movie-- get all movies
router.get('/', async (req, res) => {
    try {
        const movieData = await Movie.findAll({
            // Query configuration
            // from the movie table
            attributes:[
                'id', 'title', 'overview', 'poster_path', 'genre_id', 'release_date', 'popularity', 'shelf_id', 'user_id', 'watched', 'on_deck', 
            ],
            // 'created_at' 
            // order the movies from most recent to least
            // order: [[ 'created_at', 'DESC']],
            // From the User_table, include the movie creator's username
            include: [{
                model: User,
                attributes: ['username']
            },
        ]
        })
        // return the posts
        res.json(movieData)
         // if there was a server error, return the error
    }  catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

// Get api/movie/:id -- get a single post by id
router.get('/:id', async (req, res) => {
    try {
        const movieData = await Movie.findOne({
            where: {
                // specify the post id parameter in the query
                id: req.params.id
              },
            // Query configuration
            // from the movie table
            attributes:[
                'id', 'title', 'overview', 'poster_path', 'genre_id', 'release_date', 'popularity', 'shelf_id', 'user_id', 'watched', 'on_deck',  
            ],
            // 'created_at'
            include: [{
                model: User,
                attributes: ['username']
            },
        ]
        })
        if (!movieData) {
            // if no movie by that id exists, return an error
            res.status(404).json({ message: 'No movie found with this id'});
            return;
        }
        // return the posts
        res.json(movieData)
         // if there was a server error, return the error
    }  catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

// create a new movie
router.post('/', withAuth, async (req, res) => {
    try {
        const movieData = await Movie.create({
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            genre_id: req.body.genre_id,
            release_date: req.body.release_date,
            popularity: req.body.popularity,
            shelf_id: req.session.shelf_id,
            user_id: req.session.user_id
            // watched:
            // on_deck

        })
        res.json(movieData)
     // if there was a server error, return the error
    }  catch (err) {
        console.log(err);
        res.status(500).json.err
    }
});

// delete a movie
router.delete('/:id', withAuth, async (req, res) => {
    try {

        const movieData = await Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!movieData) {
            res.status(404).json({ message: 'No movie found with this id' });
            return;
          }
          res.json(movieData);
        } catch (err) {
            console.log(err);
            res.status(500).json.err
        }
});

module.exports = router;
