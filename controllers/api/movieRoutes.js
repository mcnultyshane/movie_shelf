
const router = require('express').Router();
const { User, Movie, Shelf, Genre } = require('../../models');
const withAuth = require('../../utils/auth');

require('dotenv').config();
// const APIkey = process.env.TMDB_AUTH
// var requestUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' +APIkey+ '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';




module.exports = router;
