const cardWrapper = document.querySelector(".card-wrapper");
const inpSearch = document.getElementById("inp-search");
const modal = document.querySelector(".modal-style");
const modalClose = document.querySelector(".close-modal");

// modalClose.addEventListener("click", () => {
//   modal.classList.replace("show", "hide");
// });

cardWrapper.addEventListener("click", e => {
  // if (e.target.classList[0] == "fa-solid") {
  //   modal.classList.replace("hide", "show");
  // }
  const beerId = e.target.getAttribute("id");
  let beerModal = document.getElementById(`modal-${beerId}`);
  beerModal.classList.replace("hide", "show");

  feetchBeer(beerId);
});

inpSearch.addEventListener("change", () => {
  let searchQuery = inpSearch.value.trim();
  fetchApi(searchQuery);
  inpSearch.value = "";
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
    <div class="card text-center border-0 cards">
      <div class="card-body card-main" >
        <img class="img" src=${result.image_url} alt="image"/>
        <p>$${result.abv}</p>
        <div class="logo">
          <i class="fa-solid fa-link fa-3x" id="${result.id}"></i>
        </div>
      </div>
      <div class="card-footer card-bottom">
        <h5>
          <button class="w-100">Add to Card</button>
        </h5>
      </div>
    </div>
  </div>
  <div class="modal-style hide" id="modal-${result.id}">
    <div class="modal-content">
      <div class="header-modal">
        <span class="close-modal" id="${result.id}">&times;</span>
        <div class="d-flex justify-content-between header-content">
          <h3 class="header-title">Ab: ${result.ph}</h3>
          <p class="header-name">${result.name}</p>
        </div>
      </div>
      <hr />
      <div class="body-modal">
        <p>
          With us since: <span class="span-text">${result.first_brewed}</span>
        </p>
        <p class="first-body-text">${result.description}</p>
        <p>It goes great width:</p>
        <p class="second-body-text">${result.food_pairing.join(", ")}</p>
      </div>
      <hr />
      <div class="footer-modal">
        <div class="row">
          <div class="col-lg-3">
            <p>
              Abv:<br />
              <span class="first-footer-text">${result.abv}</span>
            </p>
          </div>
          <div class="col-lg-9">
            <p>
              And Our tip:
              <span class="second-footer-text">${result.brewers_tips}</span>
            </p>
          </div>
        </div>
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

async function feetchBeer(id) {
  let response;
  response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  let results = await response.json();
  console.log(results);
}
