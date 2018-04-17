//TODO: load more?, color transition on hover, style search, style footer

const $searchInput = $("#searchInput");
const $searchSelect = $("#searchSelect");
const $searchBtn = $("#searchBtn");
const $searchResultsList = $("#searchResultsList");

const ARTICLE_URL = "https://en.wikipedia.org/?curid=";
const API_URL = "https://en.wikipedia.org/w/api.php?";
const API_SETTINGS = `format=json&formatversion=2&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts|description&pithumbsize=300&pilimit=max&exintro&explaintext&exlimit=max&exchars=200`;
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

    console.log(pagesSorted);

    $searchResultsList.empty();
    $searchResultsList.append(addPagesToList(pagesSorted))

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
            thumbnailSource = "img/wikipedia_placeholder_480.png";

        const disambiguationDescription = "Disambiguation page providing links to articles with similar titles";

        if (description !== disambiguationDescription) {

            return $(`<li class="page-box">
                    <div class="page-box-content">
                        <a href=${ARTICLE_URL + pageid} target="_blank">
                            <h2>${title}</h2>
                            <img src=${thumbnailSource}>
                        </a>
                        <p class="description">${description}</p>
                        <p class="extract">${extract}</p>
                        <a href=${ARTICLE_URL + pageid}>
                             <button>Continue reading...</button>
                        </a>
                    </div>
                  </li>`)

        }

    })

};

const handleError = () => {
    alert(ERROR_MSG)
};

const handleInputWhitespaces = (inputValue) => {
    return inputValue.replace(/ /g, "+")
};

$searchBtn.on("click", performSearch);
