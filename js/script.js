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
                inner += `<div class = 'col-md-6 col-lg-4 col-xl-2 item'>
            <img src= "${poster}" class = "img_poster" alt = "${nameItem}">
            <h5>${nameItem}</h5>
            </div>
            `;
            });
            movie.innerHTML = inner;

            const media = movie.querySelectorAll(".item");
            media.forEach(function (elem) {
                elem.addEventListener("click", showFullInfo);
            })
        })
        .catch(function (reason) {
            movie.innerHTML = "Упс, что-то пошло не так";
            console.log("error:" + reason.status);
        });
};
searchForm.addEventListener("submit", apiSearch);

function showFullInfo() {
    console.log(this);
}


