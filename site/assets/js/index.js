var sortBy = "popularity.desc";
var language = "en-US";
var monetizationTypes = "flatrate";
var originalLanguage = "en";

var imageSize = "w300";

// TODO: Change this
var apiKey = "96be3312f5b6b319d4637a98aa982260";

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

var genresOnPage = [
    {
        "id": 28,
        "genre": "Action"
    },
    {
        "id": 35, 
        "genre": "Comedy"
    },
    {
        "id": 878,
        "genre": "Science Fiction"
    },
    {
        "id": 10749,
        "genre": "Romance"
    },
    {
        "id": 27,
        "genre": "Horror"
    },
    {
        "id": 99,
        "genre": "Documentary"
    }
]

$(() => {
    getAndLoadContent();
    addEventHandlers();
})

function addEventHandlers() {

}

function getAndLoadCarousel() {
    for(let genre of genresOnPage) {
        const genreRow =   `<div class="row genre-container">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-12">
                                            <h4 class="row-title" id="title-${genre.genre.toLowerCase()}">${genre.genre}</h4>
                                        </div>
                                    </div>
                                    <div id="${genre.id}-carousel" class="carousel slide" data-ride="carousel">
                                        <ol id="indicator-${genre.id}" class="carousel-indicators">
                                        </ol>
                                        <div id="genre-${genre.id}" class="carousel-inner">

                                        </div>
                                        <a class="carousel-control-prev" href="#${genre.id}-carousel" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#${genre.id}-carousel" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                            </div>`;
        $("#rows-container").append(genreRow);

        loadCarouselContentForGenre(genre.id);
    }

}

function loadCarouselContentForGenre(genreId) {
    const discoverGenreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=${sortBy}&page=1&with_genres=${genreId}&with_original_language=${originalLanguage}&with_watch_monetization_types=${monetizationTypes}`;
    const baseImageURL = `https://image.tmdb.org/t/p/${imageSize}`

    $.get(discoverGenreURL, (data, status) => {

        var html = ``;
        const targetElementId = `#genre-${genreId}`;
        
        data.results.forEach((movie, idx) => {
            const moviePosterURL = `${baseImageURL}/${movie.poster_path}`
            if(idx % 6 == 0) {
                html += `<section class="row carousel-section carousel-item ${idx == 0 ? "active": ""}" id="${genreId}-${idx / 6 + 1}">`;
                let li = `<li data-target="${genreId}-carousel" data-slide-to="${idx / 6}" ${idx == 0 ? `class="active"`: ``}></li>`;
                $(`#indicator-${genreId}`).append(li);
            }
            html += `<div class="movie-item"> <!-- col-md-2 col-6 -->
                            <a class="card-link" href="#">
                                <div class="card text-bg-dark">
                                    <img src="${moviePosterURL}" alt="${movie.original_title}" class="card-img-top movie-img">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.original_title}</h5>
                                        <p class="card-text d-none">
                                            ${movie.overview}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>`;

            if(idx % 6 == 5) {
                html += `</section>`;
                $(targetElementId).append(html);

                console.log(html);

                html = ``;
            }
        })
        
    });
}

function getAndLoadContent() {
    for(let genre of genresOnPage) {
        const genreRow =   `<div class="row genre-container">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-12">
                                            <h4 class="row-title" id="title-${genre.genre.toLowerCase()}">${genre.genre}</h4>
                                        </div>
                                    </div>
                                    <div class="movie-row" id="genre-${genre.id}"> <!-- row -->
                                        <!-- Where movies will go -->
                                    </div>
                                </div>
                            </div>`;
        $("#rows-container").append(genreRow);

        loadContentForGenre(genre.id);
    }

}

function loadContentForGenre(genreId) {
    const discoverGenreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=${sortBy}&page=1&with_genres=${genreId}&with_original_language=${originalLanguage}&with_watch_monetization_types=${monetizationTypes}`;
    const baseImageURL = `https://image.tmdb.org/t/p/${imageSize}`

    $.get(discoverGenreURL, (data, status) => {

        var html = '';
        const targetElementId = `#genre-${genreId}`;
        
        data.results.forEach((movie, idx) => {
            const moviePosterURL = `${baseImageURL}/${movie.poster_path}`
            if(idx % 6 == 0) {
                html += `<section class="row" id="${genreId}-${idx / 6 + 1}">`;
            }
            html += `<div class="col-md-2 col-6 movie-item"> <!-- col-md-2 col-6 -->
                            <a class="card-link" href="#">
                                <div class="card text-bg-dark">
                                    <img src="${moviePosterURL}" alt="${movie.original_title}" class="card-img-top movie-img">
                                    <div class="card-body">
                                        <h5 class="card-title">${movie.original_title}</h5>
                                        <p class="card-text d-none">
                                            ${movie.overview}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>`;

            if(idx % 6 == 5) {
                html += `</section>`;
                $(targetElementId).append(html);

                console.log(html);

                html = ``;
            }
        })
        
    });
}