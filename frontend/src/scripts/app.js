const cardWrapper = document.querySelector(".card-wrapper");
const inpSearch = document.getElementById("inp-search");
const modal = document.querySelector(".modal-style");
const modalClose = document.querySelector(".close-modal");
const headerTitle = document.querySelector(".header-title");
const headerName = document.querySelector(".header-name");
const spanText = document.querySelector(".span-text");
const firstBodyText = document.querySelector(".first-body-text");
const secondBodyText = document.querySelector(".second-body-text");
const firstFooterText = document.querySelector(".first-footer-text");
const secondFooterText = document.querySelector(".second-footer-text");

modalClose.addEventListener("click", () => {
  modal.classList = "modal-style hide";
});

cardWrapper.addEventListener("click", e => {
  if (e.target.classList[0] == "fa-solid") {
    headerTitle.innerHTML =
      e.target.parentElement.parentElement.parentElement.parentElement.children[0].value;
    headerName.innerHTML =
      e.target.parentElement.parentElement.parentElement.parentElement.children[1].value;
    spanText.innerHTML =
      e.target.parentElement.parentElement.parentElement.parentElement.children[2].value;
    firstBodyText.innerHTML =
      e.target.parentElement.parentElement.parentElement.parentElement.children[3].value;
    secondBodyText.innerHTML =
      e.target.parentElement.parentElement.parentElement.parentElement.children[4].value;
    firstFooterText.innerHTML =
      e.target.parentElement.parentElement.children[1].textContent.substring(1);
    secondFooterText.innerHTML =
      e.target.parentElement.parentElement.parentElement.parentElement.children[5].value;

    modal.classList = "modal-style show";
  }
});

inpSearch.addEventListener("change", () => {
  let searchQuery = inpSearch.value.trim();
  fetchApi(searchQuery);
  //inpSearch.value = "";
});

async function fetchApi(query) {
  let response;

  if (query) {
    response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${query}`
    );
  } else {
    response = await fetch(`https://api.punkapi.com/v2/beers`);
  }
  let results = await response.json();
  console.log(results);

  cardWrapper.innerHTML = "";

  let generatedHTML = "";
  results.map(result => {
    generatedHTML += `
    <div class="col-md-4">
    <input type="hidden" value="AB: ${result.ph}">
    <input type="hidden" value="${result.name}">
    <input type="hidden" value="${result.first_brewed}">
    <input type="hidden" value="${result.description}">
    <input type="hidden" value="${result.food_pairing}">
    <input type="hidden" value="${result.brewers_tips}">
    <div class="card text-center border-0 cards">
      <div class="card-body card-main">
        <img class="img" src=${result.image_url} alt="image" />
        <p>$${result.abv}</p>
        <div class="logo">
          <i class="fa-solid fa-link fa-3x"></i>
        </div>
      </div>
      <div class="card-footer card-bottom">
        <h5>
       <button class="w-100">Add to Card</button>
        </h5>
      </div>
    </div>
  </div>
    `;
    cardWrapper.classList.remove("not-found");
  });
  if (results.length === 0) {
    generatedHTML = "Sorry, we don't have such a beer name!";
    cardWrapper.classList.add("not-found");
  }
  cardWrapper.innerHTML = generatedHTML;
}

fetchApi();
