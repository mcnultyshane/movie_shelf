const APIkey = "d17c86f6e8f970e2f3d4511788a9dc2a";
const titleEl = document.querySelector("#title-content");
const overviewEl = document.querySelector("#overview-content");

function handleSearchFormSubmit(event) {
  event.preventDefault();
  // document.getElementById(titleEl).innerHTML = "";
  // var searchInputVal = document.querySelector('#format-input').name;
  const formatInputVal = document.querySelector("#format-input").value;

  if (!formatInputVal) {
    console.error("You need a search input value!");
    return;
  }

  // console.log(searchInputVal);
  console.log(formatInputVal);
  searchApi(formatInputVal);
}

function searchApi(genreIdVal) {
  let locQueryUrl = "https://api.themoviedb.org/3/discover/movie?";

  locQueryUrl =
    locQueryUrl +
    "api_key=" +
    APIkey +
    "&language=en-US&page=1&sort_by=vote_count.desc&with_genres=" +
    genreIdVal;

  fetch(locQueryUrl)
    .then((response) => response.json())

    .then((movies) => showMovies(movies.results));
}
// ${movie.poster_path}
// ${movie.title}
// ${movie.release_date}
// ${movie.overview}
showMovies = (movies) => {
  let el = document.getElementsByClassName("flag");

  // if (!el) {
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add(
        "column",
        "is-one-quarter",
        "is-flex-wrap-wrap",
        "is-flex-direction-row"
      );
      movieCard.innerHTML = `
        <div id="flag" class="card mx-3">
          <div class="card-image">
            <figure class="image is-200x296">
              <img src="https://image.tmdb.org/t/p/w400/${movie.poster_path}" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
                <p class="title has-text-centered">${movie.title}</p>
          </div>


        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
      
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  
  `;
      titleEl.append(movieCard);
    });
  // } else {
  //   console.log("Blah");
  //   document.getElementById("#title-content").innerHTML = "";
  // }
};

document
  .querySelector(".search-form")
  .addEventListener("submit", handleSearchFormSubmit);
