// // Pemanggilan Ajax untuk function
// $('.search-button').on('click', function(){
//     //Pemanggilan ajax dari jquery
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=f500bd62&s=' + $('.input-keyword').val(), //$('.input-keyword').val() ini untuk menyuruh JQuery mencari input dan dikirim ke URL
//         success: results => {
//             const movies = results.Search;
//             let cards = ''; //Ini untuk wadah dari film atau cards
//             // dibawah ini buat ngambil array dari hasil trus <div> ini diambil dari html
//             movies.forEach(m => {
//                 //di bagian a href button (btn) ditambah toggle + target buat jadi aletr informasi movienya
//                 cards += showCards(m);
//             });
//             // JQuery mencari class movie-container .html/isi html diganti pake cards
//             $('.movie-container').html(cards);


//             // Tombol detail di klik pake console.log($(this).data('imdbid')); buat cek di awal
//             $('.modal-detail-button').on('click', function(){
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=f500bd62&i=' + $(this).data('imdbid'),
//                     success : m => {
//                         const movieDetail = showMovieDetail(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     Error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         Error: (e) => {
//             console.log(e.responseText);
//         }
//     });

// });


// Penggunaan Fetch()
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {

//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=f500bd62&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showCards(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;

//             // Tombol Detail Di KLIK
//             const modalDetailButton = document.querySelectorAll('.modal-detail-button'); //Kalau tombolnya banyak pake querySelectorALl() Pake ALL
//             modalDetailButton.forEach(btn => {
//                 btn.addEventListener('click', function () {
//                     const imdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=f500bd62&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(m => {
//                             const movieDetail = showMovieDetail(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         });
//                 });
//             });
//         });

// });

// Refactoring pake Asycn Await (digunakan untuk memberitahu javascript bahwa function yang akan dijalankan merupakan asyncronus)
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
});

// Event binding
document.addEventListener('click', async function (e) { //async digunakan sebelum function
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid); //await digunakan untuk memberitahu supaya JS menunggu sebelumm menjalankan kodenya
        updateDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=f500bd62&i=' + imdbid).then(response => response.json()).then(m => m);
}

function updateDetail(m) {
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=f500bd62&s=' + keyword).then(response => response.json()).then(response => response.Search);
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}



function showCards(m) {
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

function showMovieDetail(m) {
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