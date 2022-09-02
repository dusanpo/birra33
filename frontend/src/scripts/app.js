const baseUrl = "https://api.punkapi.com/v2/beers";
const cardWrapper = document.querySelector(".card-wrapper");
const inpSearch = document.getElementById("inp-search");
const filterFood = document.getElementById("filter-food");
let foodPairing = "",
  ABVmin = "",
  ABVmax = "";

let minSlider = document.getElementById("min");
let maxSlider = document.getElementById("max");

let outputMin = document.getElementById("min-value");
let outputMax = document.getElementById("max-value");

outputMin.innerHTML = minSlider.value;
outputMax.innerHTML = maxSlider.value;

minSlider.oninput = function () {
  outputMin.innerHTML = this.value;
};

maxSlider.oninput = function () {
  outputMax.innerHTML = this.value;
};

cardWrapper.addEventListener("click", e => {
  const beerId = e.target.getAttribute("id");
  let beerModal = document.getElementById(`modal-${beerId}`);
  beerModal.style.display = "block";

  let modalClose = document.getElementById(`close-${beerId}`);
  modalClose.addEventListener("click", closeModal);
  function closeModal() {
    beerModal.style.display = "none";
  }

  feetchBeer(beerId);
});

inpSearch.addEventListener("change", () => {
  let searchQuery = inpSearch.value.trim();
  fetchApi(searchQuery);
  inpSearch.value = "";
});

filterFood.addEventListener("change", e => {
  const value = e.target.value;
  switch (value) {
    case "all":
      foodPairing = "";
      break;
    case "chicken":
      foodPairing = "?food=chicken";
      break;
    case "cake":
      foodPairing = "?food=cake";
      break;
    case "cheese":
      foodPairing = "?food=cheese";
      break;
    case "salad":
      foodPairing = "?food=salad";
      break;
  }
  fetchApi();
});

[minSlider, maxSlider].forEach(element => {
  element.addEventListener("change", () => {
    let termMin = minSlider.value;
    let termMax = maxSlider.value;
    ABVmin = "?abv_gt=" + termMin;
    ABVmax = "&abv_lt=" + termMax;
    fetchApi();
  });
});

async function fetchApi(query) {
  let response;
  if (query) {
    response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${query}`
    );
  } else if (foodPairing) {
    response = await fetch(baseUrl + foodPairing);
  } else if (ABVmin) {
    response = await fetch(baseUrl + ABVmin + ABVmax);
  } else {
    response = await fetch(baseUrl);
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
        <p class="beer-price">$${result.abv}</p>
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
  <div class="modal-style" id="modal-${result.id}">
    <div class="modal-content">
      <div class="header-modal">
        <span class="close-modal" id="close-${result.id}">&times;</span>
        <div class="d-flex justify-content-between header-content">
          <h3 class="header-title">Ab: ${result.ph}</h3>
          <p class="header-name">${result.name}</p>
        </div>
      </div>
      <hr />
      <div class="body-modal">
        <p>
          With us since: <span class="date-text">${result.first_brewed}</span>
        </p>
        <p class="description-text">${result.description}</p>
        <p>It goes great width:</p>
        <p class="food-pairing-text">${result.food_pairing.join(", ")}</p>
      </div>
      <hr />
      <div class="footer-modal">
        <div class="row">
          <div class="col-lg-3">
            <p>
              Abv:<br />
              <span class="result-text">${result.abv}</span>
            </p>
          </div>
          <div class="col-lg-9">
            <p>
              And Our tip:
              <span class="tips-text">${result.brewers_tips}</span>
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
    generatedHTML = "Sorry, we don't have such a beer!";
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
