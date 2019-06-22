const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");
const urlPoster = "https://image.tmdb.org/t/p/w500";

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    if (searchText.trim().length === 0) {
        movie.innerHTML = "<h2 class = 'col-12 text-center text-danger'>Поле поиска не должно быть пустым<h2>";
        return
    }
    const server = "https://api.themoviedb.org/3/search/multi?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru&query=" + searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            let inner = "";
            if (output.results.length === 0) {
                inner = "<h2 class = 'col-12 text-center text-primary'>По вашему запросу ничего не найдено<h2>";
            }
            ;
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                const poster = item.poster_path ? urlPoster + item.poster_path : "./img/no_poster.jpg";
                let dataInfo = "";
                if (item.media_type !== "person") dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
                inner += `<div class = 'col-md-6 col-lg-4 col-xl-2 item'>
            <img src= "${poster}" class = "img_poster" alt = "${nameItem}" ${dataInfo}>
            <h5>${nameItem}</h5>
            </div>
            `;
            });
            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(function (reason) {
            movie.innerHTML = "Упс, что-то пошло не так";
            console.log("error:" + reason.status);
        });
}

searchForm.addEventListener("submit", apiSearch);

function addEventMedia() {
    const media = movie.querySelectorAll("img[data-id]");
    media.forEach(function (elem) {
        elem.style.cursor = "pointer";
        elem.addEventListener("click", showFullInfo);
    });
}

function showFullInfo() {
    let url = "";
    if (this.dataset.type === "movie") {
        url = "https://api.themoviedb.org/3/movie/" + this.dataset.id + "?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru";
    } else if (this.dataset.type === "tv") {
        url = "https://api.themoviedb.org/3/tv/" + this.dataset.id + "?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru";
    } else {
        movie.innerHTML = "<h2 class = 'col-12 text-center text-danger'>Произошла ошибка, повторите позже<h2>";
    }

    fetch(url)
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            console.log(output);
            movie.innerHTML = `
            <h4 class="col-12 text-center text-info description">${output.name || output.title}</h4>
            <div class="col-4">
            <img src="${urlPoster + output.poster_path}" alt="${output.name || output.title}">
            ${(output.homepage) ? `<p class = "text-center"><a href="${output.homepage}" target="_blank">Официальная страница</a></p>` : ""}
            ${(output.imdb_id) ? `<p class = "text-center"><a href="https://imdb.com/title/${output.imdb_id}" target="_blank">Страница на IMDB.com</a></p>` : ""}
            </div>
            <div class="col-8">
                <p class="text-primary">Рейтинг: ${output.vote_average}</p>
                <p>Статус: ${output.status}</p>
                <p>Премьера: ${output.first_air_date || output.release_date}</p>
            
                ${(output.last_episode_to_air) ? `<p>${output.number_of_seasons} сезонов ${output.last_episode_to_air.episode_number} серий вышло </p>` : ""}
                <p class="overview"><i>Описание: ${output.overview}</i></p>
            
                <br>
                <div class="youtube">
            
                </div>    
            </div>
            `;


        })
        .catch(function (reason) {
            movie.innerHTML = "Упс, что-то пошло не так";
            console.log("error:" + reason.status);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.themoviedb.org/3/trending/all/week?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru")
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            console.log("output: ", output);
            let inner = "<h3 class = 'col-12 text-center text-info title'>Самые популярные фильмы за неделю!</h3>";
            if (output.results.length === 0) {
                inner = "<h2 class = 'col-12 text-center text-primary'>По вашему запросу ничего не найдено<h2>";
            }
            ;
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? "movie" : "tv";
                const poster = item.poster_path ? urlPoster + item.poster_path : "./img/no_poster.jpg";
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                inner += `<div class = 'col-md-6 col-lg-4 col-xl-2 item'>
            <img src= "${poster}" class = "img_poster" alt = "${nameItem}" ${dataInfo}>
            <h5>${nameItem}</h5>
            </div>`;
            });
            movie.innerHTML = inner;

            addEventMedia();
        })
        .catch(function (reason) {
            movie.innerHTML = "Упс, что-то пошло не так";
            console.log("error:" + reason.status);
        });
});




