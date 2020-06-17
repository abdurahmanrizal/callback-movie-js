const searchBtn = document.querySelector(".search-button");

searchBtn.addEventListener("click", async function () {
  try {
    const search = document.querySelector(".input-keyword");
    const movies = await getMovie(search.value);
    UiMovie(movies);
  } catch (err) {
    uiError(err);
    // console.log(err);
  }
});

// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbID = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbID);
    uiDetailMovies(movieDetail);
  }
});
// function for get movie from omdb API
function getMovie(search) {
  return fetch("http://www.omdbapi.com/?apikey=cc5844e4&s=" + search)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      if (result.Response === "False") {
        throw new Error(result.Error);
      }
      return result.Search;
    });
}

function UiMovie(movies) {
  let cards = "";
  movies.forEach((mov) => {
    cards += showMovie(mov);
  });
  const moviesContainer = document.querySelector(".movie-container");
  moviesContainer.innerHTML = cards;
}

// function for get movie detail based imdbid
function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=cc5844e4&i=" + imdbid)
    .then((response) => response.json())
    .then((result) => result);
}

// function ui detail movies
function uiDetailMovies(res) {
  const detail = document.querySelector(".modal-body");
  const titleMovie = document.querySelector(".title-movie");
  let detailMovie = showMovieDetail(res);
  detail.innerHTML = detailMovie;
  titleMovie.innerHTML = `${res.Title} (${res.Year})`;
}

function uiError(error) {
  const moviesContainer = document.querySelector(".movie-container");
  //   const keyword = document.querySelector(".input-keyword");
  moviesContainer.innerHTML = `<div class="col-md-12">
                                    <div class="alert alert-warning text-center" role="alert">
                                       ${error}
                                    </div>
                                </div>`;
}

function showMovie(m) {
  return `<div class="col-md-4 my-3">
                <div class="card-deck">
                  <div class="card shadow">
                      <div class="card-body">
                      <img src="${m.Poster}" class="card-img-top" alt="${m.Title}" height="449">
                          <h5 class="card-title mt-3">${m.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                          data-target="#detail-modal-movie" data-imdbid="${m.imdbID}">Show Details</a>
                      </div>
                  </div>
                </div>
              </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                  <div class="row">
                  <div class="col-md-3">
                      <img src="${m.Poster}" class="img-fluid shadow img-thumbnail" alt="" />
                  </div>
                  <div class="col-md">
                      <ul class="list-group">
                      <li class="list-group-item">
                          <h6>Judul : ${m.Title} (${m.Year})</h6>
                      </li>
                      <li class="list-group-item">
                          <strong>Rilis :</strong> ${m.Released}
                      </li>
                      <li class="list-group-item">
                          <strong>Aktor : </strong> ${m.Actors}
                      </li>
                      <li class="list-group-item">
                          <strong>Director : </strong> ${m.Director}
                      </li>
                      <li class="list-group-item">
                          <strong>Penulis : </strong> ${m.Writer}
                      </li>
                      <li class="list-group-item">
                          <strong>Plot : </strong> ${m.Plot}
                      </li>
                      </ul>
                  </div>
                  </div>
              </div>`;
}
