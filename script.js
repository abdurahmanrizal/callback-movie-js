$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=cc5844e4&s=" + $(".input-keyword").val(),
    success: (results) => {
      const res = results.Response;
      if (res === "True") {
        const movies = results.Search;
        let cards = "";
        movies.forEach((mov) => {
          cards += showMovie(mov);
        });
        $(".movie-container").html(cards);
        $(".modal-detail-button").on("click", function () {
          $.ajax({
            url:
              "http://www.omdbapi.com/?apikey=cc5844e4&i=" +
              $(this).data("imdbid"),
            success: (m) => {
              let movie = showMovieDetail(m);
              $(".modal-body").html(movie);
              $(".title-movie").html(`${m.Title} (${m.Year})`);
            },
            error: (e) => {
              console.log(e.responseText);
            },
          });
        });
      } else {
        $(".movie-container").html(`<div class="col-md-12">
                <div class="alert alert-warning text-center" role="alert">
                    Film ${$(".input-keyword").val()} tidak ditemukan...
                </div>
            </div>`);
      }
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showMovie(m) {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <div class="card-body">
                    <img src="${m.Poster}" class="card-img-top" alt="...">
                        <h5 class="card-title mt-3">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                        data-target="#detail-modal-movie" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid" alt="" />
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
