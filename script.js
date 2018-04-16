const $searchInput = $("#searchInput");
const $searchSelect = $("#searchSelect");
const $searchBtn = $("#searchBtn");
const $searchResultsList = $("#searchResultsList");

const ARTICLE_URL = "https://en.wikipedia.org/?curid=";
const API_URL = "https://en.wikipedia.org/w/api.php?";
const API_SETTINGS = `format=json&formatversion=2&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts|description&pithumbsize=300&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max`;
const ERROR_MSG = "An error occurred. Please check your internet connection and try again.";

const performSearch = () => {

    fetchDataFromWikipedia()
        .then(data => renderSearchResults(data))
        .catch(handleError)

};

const fetchDataFromWikipedia = () => {

    const searchLimit = $searchSelect.val();
    const searchTerm = handleInputWhitespaces($searchInput.val());

    console.log(`${API_URL}${API_SETTINGS}&gsrlimit=${searchLimit}&gsrsearch=${searchTerm}`);

    return $.ajax({
        dataType: "jsonp", // jsonp is needed to prevent CORS problems
        url: `${API_URL}${API_SETTINGS}&gsrlimit=${searchLimit}&gsrsearch=${searchTerm}`
    })

};

const renderSearchResults = (data) => {

    const pages = data.query.pages;

    const pagesSorted = pages.sort((prev, next) => {
        return prev.index - next.index
    });

    $searchResultsList.append(addArticlesToList(pagesSorted))

};

const addArticlesToList = (pages) => {

    return pages.map(page => {

        const pageId = page.pageid;
        const title = page.title;
        const description = page.description;
        const extract = page.extract;

        return $(`<li>
                    <a href=${ARTICLE_URL + pageId} target="_blank">
                        <h2>${title}</h2>
                    </a>
                    <p>${description}</p>
                    <p>${extract}</p>
                  </li>`)

    })

};

const handleError = () => {
    alert(ERROR_MSG)
};

const handleInputWhitespaces = (inputValue) => {
    return inputValue.replace(/ /g, "+")
};

$searchBtn.on("click", performSearch);
