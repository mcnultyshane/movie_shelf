const APIkey = "d17c86f6e8f970e2f3d4511788a9dc2a";
var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");



function searchApi(genreIdVal) {
  var locQueryUrl = "https://api.themoviedb.org/3/discover/movie?";

  locQueryUrl =
    locQueryUrl +
    "api_key=" +
    APIkey +
    "&language=en-US&page=1&sort_by=vote_count.desc&with_genres=" +
    genreIdVal;

  console.log(locQueryUrl);

  fetch(locQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  // var searchInputVal = document.querySelector('#format-input').name;
  var formatInputVal = document.querySelector("#format-input").value;

  if (!formatInputVal) {
    console.error("You need a search input value!");
    return;
  }
  // console.log(searchInputVal);
  console.log(formatInputVal);
  searchApi(formatInputVal);
}
document
  .querySelector(".search-form")
  .addEventListener("submit", handleSearchFormSubmit);
