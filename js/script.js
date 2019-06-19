const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=ad2b38c3623133c5e9dd093465546d14&language=ru&query=" + searchText;
    requestApi(server);
};

searchForm.addEventListener("submit", apiSearch);

function requestApi(url) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.addEventListener("readystatechange", function() {
    	if (request.readyState !== 4) return;
    	if (request.status !== 200) {
    		console.log("error:" + request.status);
    		return;
    	};
    	const output = JSON.parse(request.responseText);
    	let inner = "";
    	output.results.forEach(function(item) {
    		let nameItem = item.name || item.title;
    		inner += '<div class="row col-lg-12">' + name.Item + '</div>';
    	});
    	movie.innerHTML = inner;
		});
};

