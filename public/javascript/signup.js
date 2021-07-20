const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log('click');
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();


  // if both fields have content
  if (username && password) {
    // POST the new user to the user table in the database.

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    // when the fetch promise is fufilled, check the response status and convey the results
    if (response.ok) {
      document.location.replace('/shelf');
      alert('Account created! Logging you in now.');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.signup-form').addEventListener('submit', signupFormHandler);