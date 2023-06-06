// Pemanggilan Ajax untuk function
$('.search-button').on('click', function(){
    //Pemanggilan ajax dari jquery
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=f500bd62&s=' + $('.input-keyword').val(), //$('.input-keyword').val() ini untuk menyuruh JQuery mencari input dan dikirim ke URL
        success: results => {
            const movies = results.Search;
            let cards = ''; //Ini untuk wadah dari film atau cards
            // dibawah ini buat ngambil array dari hasil trus <div> ini diambil dari html
            movies.forEach(m => {
                //di bagian a href button (btn) ditambah toggle + target buat jadi aletr informasi movienya
                cards += showCards(m);
            });
            // JQuery mencari class movie-container .html/isi html diganti pake cards
            $('.movie-container').html(cards);
    
    
            // Tombol detail di klik pake console.log($(this).data('imdbid')); buat cek di awal
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=f500bd62&i=' + $(this).data('imdbid'),
                    success : m => {
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    Error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        Error: (e) => {
            console.log(e.responseText);
        }
    });

});

function showCards(m){
    return `<div class="col-md-3 my-3">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
            </div>
        </div>`;
};

function showMovieDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : ${m.Director}</strong></li>
                            <li class="list-group-item"><strong>Actors : ${m.Actors}</strong></li>
                            <li class="list-group-item"><strong>Writer : ${m.Writer}</strong></li>
                            <li class="list-group-item"><strong>Plot :</strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
};