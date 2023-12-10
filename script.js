// Get a reference to the search button and input field
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

// Function to handle the search process
const performSearch = () => {
  // Get the user's input
  const searchTerm = searchInput.value.trim();
  
  // Construct the URL to fetch movie data from TMDb API
  const apiKey = 'acef5215da1d5a5487a32395aa39a944'; // Replace with your API key
  const baseUrl = 'https://api.themoviedb.org/3/search/movie';
  const queryParams = `?api_key=${apiKey}&query=${searchTerm}`;

  // Fetch data from TMDb API
  fetch(baseUrl + queryParams)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      // Process the fetched movie data
      const movies = data.results.slice(0, 5); // Retrieve only the first 5 movies

      // Store movie data in sessionStorage to pass it to results.html
      sessionStorage.setItem('movies', JSON.stringify(movies));

      // Redirect to results.html
      window.location.href = 'results.html';
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
      // Handle errors or display a message to the user
    });
};

// Add click event listener to the search button
searchButton.addEventListener('click', performSearch);

// Add keydown event listener to the input field to detect "Enter" key press
searchInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    performSearch(); // Call the performSearch function
  }
});

// Trying to add everything to this one script - this is results.js 

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve movie data from sessionStorage
    const movies = JSON.parse(sessionStorage.getItem('movies'));
    const resultsContainer = document.getElementById('resultsContainer');
  
    if (movies) {
      // Display movies on the results page

      movies.forEach(movie => {
        const addMovieToListButton = document.createElement('button');
        const reviewMovieButton = document.createElement('button');
        const buttonsContainer = document.createElement('div');
        const contentContainer = document.createElement('div');
        const movieElement = document.createElement('div');


        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster+Available'; // Default placeholder for missing poster images
        
        addMovieToListButton.addEventListener('click', () => {
            addMovieToListFunction(movie);
        });

        reviewMovieButton.addEventListener('click', () => {
            goToReviewPage(movie);
        })

        addMovieToListButton.classList.add('btn', 'btn-success', 'btn-sm', 'mr-2');
        addMovieToListButton.textContent = "Add to list";
        buttonsContainer.appendChild(addMovieToListButton);

        reviewMovieButton.classList.add('btn', 'btn-info', 'btn-sm');
        reviewMovieButton.textContent = "Review";
        buttonsContainer.appendChild(reviewMovieButton);

        movieElement.innerHTML = `
        <h2 class="text-white">${movie.title} (${movie.release_date.slice(0, 4)})</h2>
        <img src="${posterUrl}" alt="${movie.title} Poster" style="max-width: 150px;" class="img-rounded">
        <p class="text-white" style="max-width: 750px; word-wrap: break-word; margin-top:10px;">${movie.overview}</p>
        <hr class="bg-white">
       `;

       buttonsContainer.classList.add('d-flex', 'align-items-center', 'justify-content-center');
       movieElement.classList.add('d-flex', 'flex-column', 'align-items-center');
       contentContainer.classList.add('d-flex', 'flex-column', 'align-items-center');

       contentContainer.appendChild(buttonsContainer);
       contentContainer.appendChild(movieElement);
       resultsContainer.appendChild(contentContainer);
      });      
    } else {
      // Handle the case when there's no movie data available
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'No movies found.';
    }
  });

// Function to add movies to the array in the sessionStorage. Checks if the movie
// is already in the session. 
const addMovieToListFunction = (movie) => {
    let existingMovieList = JSON.parse(sessionStorage.getItem('myMovieList')) || [];
    const isMovieInArray = existingMovieList.some(item => item.includes(movie.title));
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster+Available'; // Default placeholder for missing poster images

    if (!isMovieInArray) {
        existingMovieList.push(`${movie.title}, ${movie.release_date.slice(0,4)}, ${posterUrl}`);
        sessionStorage.setItem('myMovieList', JSON.stringify(existingMovieList));
        console.log(sessionStorage.getItem('myMovieList'));
    };
}

const goToReviewPage = (movie) => {
    sessionStorage.setItem('movieToReview', `${movie.title}`);
    window.location.href = './reviewform.html';

    console.log(sessionStorage.getItem('movieToReview'));
}

// Form submission event listener 

document.getElementById('movie-review-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const movieReview = document.getElementById('movie-review').value;
    const movieReviewRating = document.getElementById('movie-review-rating').value;

    let movieReviewList = JSON.parse(sessionStorage.getItem('movieReviewList')) || [];

    movieReviewList.push(`${movieReview}, ${movieReviewRating}`);
    sessionStorage.setItem('movieReviewList', JSON.stringify(movieReviewList));
    console.log(sessionStorage.getItem('movieReviewList'));
})

