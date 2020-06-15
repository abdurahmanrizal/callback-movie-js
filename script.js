// with JQuery
// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "http://www.omdbapi.com/?apikey=cc5844e4&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const res = results.Response;
//       if (res === "True") {
//         const movies = results.Search;
//         let cards = "";
//         movies.forEach((mov) => {
//           cards += showMovie(mov);
//         });
//         $(".movie-container").html(cards);
//         $(".modal-detail-button").on("click", function () {
//           $.ajax({
//             url:
//               "http://www.omdbapi.com/?apikey=cc5844e4&i=" +
//               $(this).data("imdbid"),
//             success: (m) => {
//               let movie = showMovieDetail(m);
//               $(".modal-body").html(movie);
//               $(".title-movie").html(`${m.Title} (${m.Year})`);
//             },
//             error: (e) => {
//               console.log(e.responseText);
//             },
//           });
//         });
//       } else {
//         $(".movie-container").html(`<div class="col-md-12">
//                 <div class="alert alert-warning text-center" role="alert">
//                     Film ${$(".input-keyword").val()} tidak ditemukan...
//                 </div>
//             </div>`);
//       }
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// with vanilla JS

// halaman utama
fetch("http://www.omdbapi.com/?apikey=cc5844e4&s=dilan")
  .then((response) => response.json())
  .then((result) => {
    const movies = result.Search;
    let cards = "";
    movies.forEach((mov) => {
      cards += showMovie(mov);
    });
    const moviesContainer = document.querySelector(".movie-container");
    moviesContainer.innerHTML = cards;
    const detailButton = document.querySelectorAll(".modal-detail-button");
    detailButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        const imdbID = this.dataset.imdbid;
        fetch("http://www.omdbapi.com/?apikey=cc5844e4&i=" + imdbID)
          .then((response) => response.json())
          .then((result) => {
            const detail = document.querySelector(".modal-body");
            const titleMovie = document.querySelector(".title-movie");
            let detailMovie = showMovieDetail(result);
            detail.innerHTML = detailMovie;
            titleMovie.innerHTML = `${result.Title} (${result.Year})`;
          });
      });
    });
  });

// jika user menggunakan keyword untuk mencari
const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", function () {
  const keyword = document.querySelector(".input-keyword");
  fetch("http://www.omdbapi.com/?apikey=cc5844e4&s=" + keyword.value)
    .then((response) => response.json())
    .then((result) => {
      const movies = result.Search;
      let cards = "";
      movies.forEach((mov) => {
        cards += showMovie(mov);
      });
      const moviesContainer = document.querySelector(".movie-container");
      moviesContainer.innerHTML = cards;
      const detailButton = document.querySelectorAll(".modal-detail-button");
      detailButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbID = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=cc5844e4&i=" + imdbID)
            .then((response) => response.json())
            .then((result) => {
              const detail = document.querySelector(".modal-body");
              const titleMovie = document.querySelector(".title-movie");
              let detailMovie = showMovieDetail(result);
              detail.innerHTML = detailMovie;
              titleMovie.innerHTML = `${result.Title} (${result.Year})`;
            });
        });
      });
    })
    .catch((response) => {
      const moviesContainer = document.querySelector(".movie-container");
      const keyword = document.querySelector(".input-keyword");
      moviesContainer.innerHTML = `<div class="col-md-12">
                      <div class="alert alert-warning text-center" role="alert">
                          Film ${keyword.value} tidak ditemukan...
                      </div>
                  </div>`;
    });
});

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
