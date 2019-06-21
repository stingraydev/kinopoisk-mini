const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");
const urlPoster = "https://image.tmdb.org/t/p/w500";

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru&query=" + searchText;
    movie.innerHTML = "Загрузка";

    fetch(server)
        .then(function(value) {
            return value.json();
        })
        .then(function(output) {
            let inner = "";
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `
            <div class = 'col-12 col-md-3 col-xl-4 item'>
            <img src= "${urlPoster + item.poster_path}" alt = "${nameItem}">
            <h5>${nameItem}</h5>
            </div>
            `;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = "Упс, что-то пошло не так";
            console.log("error:" + reason.status);
        });
};
searchForm.addEventListener("submit", apiSearch);