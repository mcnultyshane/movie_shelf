const router = require('express').Router();
const movieQuotes = require('popular-movie-quotes');

router.get('/', async (req, res) => {
  try {

    quote = await movieQuotes.getRandomQuote();
    res.json(quote);
    // res.render('quotes', {
    //   quote,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json.err;
  }
});

module.exports = router;
