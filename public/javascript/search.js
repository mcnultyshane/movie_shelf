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
  // for (var i = 0; i < searchedMovies[0].length; i++) {
  //   console.log(searchedMovies[0][i]);
  // }

  console.log(searchedMovies);
  console.log(this);
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add(
      'column',
      'is-one-quarter',
      'is-flex-wrap-wrap',
      'is-flex-direction-row'
    );
    movieCard.innerHTML = 
    `<div id="flag" class="card mx-3">
        <div class="card-image">
          <figure class="image is-200x296">
            <img src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
              <p class="title has-text-centered">${movie.title}</p>
        </div>
      </div>
    <footer class="card-footer">
      <a onclick="addWatched(event);" 
      title="${movie.title}"
      data-overview="${movie.overview}"
      data-release_date="${movie.release_date}"
      data-poster_path="https://image.tmdb.org/t/p/w400/${movie.poster_path}"
      id="add-watched"
      class="card-footer-item">
      Save</a>

      <a onclick="addOnDeck(event);" 
      title="${movie.title}"
      data-overview="${movie.overview}"
      data-release_date="${movie.release_date}"
      data-poster_path="https://image.tmdb.org/t/p/w400/${movie.poster_path}"
      id="add-0ndeck"
      class="card-footer-item">
      Delete</a>


    </footer>
    </div>`;
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
  console.log(movieSearchEl);
  searchApi(movieSearchEl, ApiKey);
}

document.querySelector('#movie-search-form').addEventListener('submit', getKey);

// getKey();
