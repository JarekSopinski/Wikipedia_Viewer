const $searchInput = $("#searchInput");
const $searchSelect = $("#searchSelect");
const $searchBtn = $("#searchBtn");

let searchTerm = "";
let searchLimit = "10";

const API_URL = "https://en.wikipedia.org/w/api.php?";
const API_SETTINGS = `format=json&formatversion=2&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts|description&pithumbsize=300&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max`;
const ERROR_MSG = "An error occurred. Please check your internet connection and try again.";

const performSearch = () => {

    fetchDataFromWikipedia()
        .then(data => console.log(data))
        .catch(handleError)

};

const fetchDataFromWikipedia = () => {

    searchLimit = $searchSelect.val();
    searchTerm = handleInputWhitespaces($searchInput.val());

    console.log(`${API_URL}${API_SETTINGS}&gsrlimit=${searchLimit}&gsrsearch=${searchTerm}`);

    return $.ajax({
        dataType: "jsonp", // jsonp is needed to prevent CORS problems
        url: `${API_URL}${API_SETTINGS}&gsrlimit=${searchLimit}&gsrsearch=${searchTerm}`
    })

};

const handleError = () => {
    alert(ERROR_MSG)
};

const handleInputWhitespaces = (inputValue) => {
    return inputValue.replace(/ /g, "+")
};

$searchBtn.on("click", performSearch);
