async function addWatched(event) {

  const element = event.target;

  const title = element.title;

  const overview = element.getAttribute('data-overview');
  const release_date = element.getAttribute('data-release_date');
  const poster_path = element.getAttribute('data-poster_path');



  const response = await fetch('/api/movies/watched', {
    method: 'POST',
    body: JSON.stringify({title, overview, poster_path, release_date}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log(response);
  } else {
    console.log(response.statusText);
  }
}

async function addOnDeck(event) {

  const element = event.target;

  const title = element.title;

  const overview = element.getAttribute('data-overview');
  const release_date = element.getAttribute('data-release_date');
  const poster_path = element.getAttribute('data-poster_path');



  const response = await fetch('/api/movies/onDeck', {
    method: 'POST',
    body: JSON.stringify({title, overview, poster_path, release_date}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log(response);
  } else {
    console.log(response.statusText);
  }
}

