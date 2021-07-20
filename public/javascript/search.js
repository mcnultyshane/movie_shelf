let ApiKey = '';
const movieList = document.querySelector('#movie-list');

let searchedMovies = [];

function searchApi(movieSearchEl, ApiKey) {
  let locQueryUrl = 'https://api.themoviedb.org/3/search/movie?';

  locQueryUrl =
    locQueryUrl +
    'api_key=' +
    ApiKey +
    '&language=en-US&page=1&query=' +
    movieSearchEl +
    '&include_adult=false';

  fetch(locQueryUrl)
    .then((response) => response.json())

    .then((movies) => showMovies(movies.results));
}

showMovies = (movies) => {
  let searchedMovies = [];
  searchedMovies.push(movies);
  document.getElementById('movie-list').innerHTML = '';

  // console.log(searchedMovies);
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add(
      'column',
      'is-mobile',
      'is-one-third-tablet',
      'is-2-desktop',
      'is-2-widescreen',
      'is-1.5-fullhd',
      'mx-5'
    );
    movieCard.innerHTML = 
   ` <article>
    <figure class="image is-200x296">
      <img src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" />
    </figure>
    <h2 class="is-size-6-desktop is-size-7-mobile has-text-centered redText is-family-secondary">${movie.title}</h2>
  </article>
  <footer class="card-footer ">
    
      <a onclick="addWatched(event);" 
      title="${movie.title}"
      data-overview="${movie.overview}"
      data-release_date="${movie.release_date}"
      data-poster_path="https://image.tmdb.org/t/p/w400/${movie.poster_path}"
      id="add-watched"
      class="card-footer-item mx-2 mt-2 is-small is-outlined button is-danger">
      Watched</a>

      <a onclick="addOnDeck(event);" 
      title="${movie.title}"
      data-overview="${movie.overview}"
      data-release_date="${movie.release_date}"
      data-poster_path="https://image.tmdb.org/t/p/w400/${movie.poster_path}"
      id="add-0ndeck"
      class="card-footer-item mx-2 mt-2 is-small is-outlined has-text-centered button is-light">
      Want to watch</a>


    </footer>`
   ;
    movieList.append(movieCard);
  });
};
function getKey(event) {
  event.preventDefault();
  fetch('/api/users/key', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      ApiKey = data;
      console.log(ApiKey);
      movieSearchFormSubmit(ApiKey);
    });
}
function movieSearchFormSubmit(ApiKey) {
  let movieSearchEl = document.querySelector('#movie-search').value.trim();

  if (!movieSearchEl) {
    console.error('Please enter a movie to search');
    return;
  }
  // console.log(movieSearchEl);
  searchApi(movieSearchEl, ApiKey);
}

document.querySelector('#movie-search-form').addEventListener('submit', getKey);

