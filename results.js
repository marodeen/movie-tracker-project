document.addEventListener('DOMContentLoaded', () => {
    // Retrieve movie data from sessionStorage
    const movies = JSON.parse(sessionStorage.getItem('movies'));
  
    if (movies) {
      // Display movies on the results page
      const resultsContainer = document.getElementById('resultsContainer');
  
      movies.forEach(movie => {
        const addMovieToListButton = document.createElement('button');
        const movieElement = document.createElement('div');

        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster+Available'; // Default placeholder for missing poster images
        
        addMovieToListButton.addEventListener('click', () => {
          addMovieToListFunction(movie);
        });

        addMovieToListButton.classList.add('btn', 'btn-success', 'btn-sm');
        addMovieToListButton.textContent = "Add to list";

        movieElement.innerHTML = `
        <h2 class="text-white">${movie.title}, ${movie.release_date.slice(0, 4)}</h2>
        <img src="${posterUrl}" alt="${movie.title} Poster" style="max-width: 150px;">
        <p class="text-white" style="max-width: 750px; word-wrap: break-word;">${movie.overview}</p>
        <hr/>
       `;

       resultsContainer.appendChild(addMovieToListButton)
       resultsContainer.appendChild(movieElement);
      });      
    } else {
      // Handle the case when there's no movie data available
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'No movies found.';
      document.body.appendChild(noResultsMessage);
    }
  });

  const addMovieToListFunction = (movie) => {
    let existingMovieList = JSON.parse(sessionStorage.getItem('myMovieList')) || [];
    const isMovieInArray = existingMovieList.some(item => item.includes(movie.title));

    if (!isMovieInArray) {
      existingMovieList.push(`${movie.title}, ${movie.release_date.slice(0,4)}`);
      sessionStorage.setItem('myMovieList', JSON.stringify(existingMovieList));
      console.log(sessionStorage.getItem('myMovieList'));
    };
  }
  