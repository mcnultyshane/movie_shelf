// eslint-disable-next-line no-unused-vars
async function addWatched(event) {
  console.log('click');
  const element = event.target;

  const title = element.title;

  const overview = element.getAttribute('data-overview');
  const release_date = element.getAttribute('data-release_date');
  const poster_path = element.getAttribute('data-poster_path');

  console.log(title);
  console.log(overview);
  console.log(release_date);
  console.log(poster_path);


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

// eslint-disable-next-line no-unused-vars
async function addOnDeck(event) {
  console.log('click');
  const element = event.target;

  const title = element.title;

  const overview = element.getAttribute('data-overview');
  const release_date = element.getAttribute('data-release_date');
  const poster_path = element.getAttribute('data-poster_path');

  console.log(title);
  console.log(overview);
  console.log(release_date);
  console.log(poster_path);


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

