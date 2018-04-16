const $searchBtn = $("#searchBtn");

let searchTerm = "";
let searchLimit = "10";
const API_URL_END = "https://en.wikipedia.org/w/api.php?";
const API_URL_SETTINGS = `format=json&formatversion=2&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts|description&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=${searchLimit}&gsrsearch=`;
const ERROR_MSG = "An error occurred. Please check your internet connection and try again.";

const fetchDataFromWikipedia = () => {

    searchTerm = "meaning";

    return $.ajax({
        method: "GET",
        dataType: "jsonp",
        url: `${API_URL_END}${API_URL_SETTINGS}${searchTerm}`
    })

};

const performSearch = () => {

    fetchDataFromWikipedia()
        .then(data => console.log(data.query.pages))
        .catch(handleError)

};

const handleError = () => {
    alert(ERROR_MSG)
};

$searchBtn.on("click", performSearch);
