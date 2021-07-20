// const movieQuote = require("popular-movie-quotes");

const movieQuote = async () => {
    const response = await fetch("/api/quote", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    // if (response.ok) {
        // console.log(data);
        const quoteEl = document.getElementById('random-quote');
        quoteEl.innerHTML = data;
    // } else {
    //     alert(response.statusText);
    // }
};

document.addEventListener("DOMContentLoaded", movieQuote);