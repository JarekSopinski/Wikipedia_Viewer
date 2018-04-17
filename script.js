const $performSearchIcon = $("#performSearchIcon");
const $searchFormContainer = $("#searchFormContainer");
const $searchInput = $("#searchInput");
const $searchSelect = $("#searchSelect");
const $searchBtn = $("#searchBtn");
const $searchResultsList = $("#searchResultsList");
const $loadMoreBtn = $("#loadMoreBtn");

const ARTICLE_URL = "https://en.wikipedia.org/?curid=";
const API_URL = "https://en.wikipedia.org/w/api.php?";
const API_SETTINGS = `format=json&formatversion=2&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts|description&pithumbsize=300&pilimit=max&exintro&explaintext&exlimit=max&exchars=200`;
const ERROR_CONNECTION_MSG = "An error occurred. Please check your internet connection and try again.";
const ERROR_EMPTY_INPUT_MSG = "You didn't input anything!";

let searchSelectState = 10;

const performSearch = (searchStatus) => {

    searchStatus === "additionalSearch" ?
        searchSelectState += 10
        :
        searchSelectState = parseInt($searchSelect.val());

    fetchDataFromWikipedia()
        .then(data => renderSearchResults(data))
        .catch(handleError)

};

const fetchDataFromWikipedia = () => {

    const searchLimit = searchSelectState.toString();
    const searchTerm = handleInputWhitespaces($searchInput.val());

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

    $searchResultsList.empty();
    $searchResultsList.append(addPagesToList(pagesSorted));
    $loadMoreBtn.removeClass("hiddenItem");

};

const addPagesToList = (pages) => {

    return pages.map(page => {

        const { pageid, title, extract } = page;

        let description = page.description || "No description provided";
        description = description.charAt(0).toUpperCase() + description.slice(1);

        let thumbnailSource;
        page.thumbnail ?
            thumbnailSource = page.thumbnail.source
            :
            thumbnailSource = "img/wikipedia_placeholder_500_notext.png";

        const disambiguationDescription = "Disambiguation page providing links to articles with similar titles";

        if (description !== disambiguationDescription) {

            return $(`<li class="page-box">
                    <div class="page-box-content">
                        <a href=${ARTICLE_URL + pageid} target="_blank">
                            <h2>${title}</h2>
                            <img src=${thumbnailSource}>
                        </a>
                        <p class="page-box-content-description">${description}</p>
                        <p class="page-box-content-extract">${extract || ""}</p>

                             <div class="page-box-content-btn">
                                <a href=${ARTICLE_URL + pageid} target="_blank">
                                <img src="img/wikipedia-logo-small.png">
                                <span>Read on Wikipedia</span>
                                </a>
                            </div>
                        
                    </div>
                  </li>`)

        }

    })

};

const handleError = () => {
    !$searchInput.val() ? alert(ERROR_EMPTY_INPUT_MSG) : alert(ERROR_CONNECTION_MSG)
};

const handleInputWhitespaces = (inputValue) => {
    return inputValue.replace(/ /g, "+")
};

const setSearchSelectState = () => {
    searchSelectState = parseInt($searchSelect.val())
};

const displaySearchFormContainer = () => {
  $searchFormContainer.removeClass("hiddenItem")
};

$performSearchIcon.on("click", displaySearchFormContainer);
$searchBtn.on("click", () => performSearch("normalSearch"));
$searchSelect.on("change", setSearchSelectState);
$loadMoreBtn.on("click", () => performSearch("additionalSearch"));
