const searchForm = document.querySelector("#search-form");

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector("#search-text").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru&query=" + searhText;
    requestApi(method, server);

};

searchForm.addEventListener("submit", apiSearch);

function requestApi(url) {
    const request = new XMLHttpRequest();
    console.log(request);
    request.open(method, url);
    request.send();


};