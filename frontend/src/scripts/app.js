const baseUrl = "https://api.punkapi.com/v2/beers?page=";
const cardWrapper = document.querySelector(".card-wrapper");
const searchByName = document.getElementById("inp-search");
const filterFood = document.getElementById("filter-food");
const inputBrewedDates = document.querySelectorAll(".date-input");
const scrollToTop = document.querySelector(".scroll-to-top");
const pageNumber = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");

let foodPairing = "",
  ABVmin = "",
  ABVmax = "",
  brewedAfter = "",
  brewedBefore = "",
  page = 1,
  perPage = "&per_page=12";

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

searchByName.addEventListener("change", () => {
  let searchQuery = searchByName.value.trim();
  fetchApi(searchQuery);
  searchByName.value = "";
});

filterFood.addEventListener("change", e => {
  const value = e.target.value;
  switch (value) {
    case "all":
      foodPairing = "";
      break;
    case "chicken":
      foodPairing = "&food=chicken";
      break;
    case "cake":
      foodPairing = "&food=cake";
      break;
    case "cheese":
      foodPairing = "&food=cheese";
      break;
    case "salad":
      foodPairing = "&food=salad";
      break;
  }
  page = 1;
  fetchApi();
});

[minSlider, maxSlider].forEach(element => {
  element.addEventListener("change", () => {
    let termMin = minSlider.value;
    let termMax = maxSlider.value;
    ABVmin = "&abv_gt=" + termMin;
    ABVmax = "&abv_lt=" + termMax;
    page = 1;
    fetchApi();
  });
});

inputBrewedDates.forEach(input => {
  input.addEventListener("change", e => {
    let value = e.target.value;
    let date = `${value.substring(5, 7)}-${value.substring(0, 4)}`;
    if (e.target.id === "after") {
      brewedAfter = "&brewed_after=" + date;
    } else {
      brewedBefore = "&brewed_before=" + date;
    }
    page = 1;
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
    response = await fetch(baseUrl + page + perPage + foodPairing);
  } else if (ABVmin) {
    response = await fetch(baseUrl + page + perPage + ABVmin + ABVmax);
  } else {
    response = await fetch(
      baseUrl + page + perPage + brewedAfter + brewedBefore
    );
  }
  let results = await response.json();
  console.log(results);

  pageNumber.innerText = page;
  if (page === 1) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }
  if (results.length < 12) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  cardWrapper.innerHTML = "";

  let generatedHTML = "";
  results.map(result => {
    const {
      image_url,
      abv,
      id,
      ph,
      name,
      first_brewed,
      description,
      food_pairing,
      brewers_tips,
    } = result;
    generatedHTML += `
    <div class="col-md-4">
    <div class="card text-center border-0 cards">
      <div class="card-body card-main" >
        <img class="img" src=${image_url} alt="image"/>
        <p class="beer-price">$${abv}</p>
        <div class="logo">
          <i class="fa-solid fa-link fa-3x" id="${id}"></i>
        </div>
      </div>
      <div class="card-footer card-bottom">
        <h5>
          <button class="w-100">Add to Card</button>
        </h5>
      </div>
    </div>
  </div>
  <div class="modal-style" id="modal-${id}">
    <div class="modal-content">
      <div class="header-modal">
        <span class="close-modal" id="close-${id}">&times;</span>
        <div class="d-flex justify-content-between header-content">
          <h3 class="header-title">Ab: ${ph}</h3>
          <p class="header-name">${name}</p>
        </div>
      </div>
      <hr />
      <div class="body-modal">
        <p>
          With us since: <span class="date-text">${first_brewed}</span>
        </p>
        <p class="description-text">${description}</p>
        <p>It goes great width:</p>
        <p class="food-pairing-text">${food_pairing.join(", ")}</p>
      </div>
      <hr />
      <div class="footer-modal">
        <div class="row">
          <div class="col-lg-3">
            <p>
              Abv:<br />
              <span class="result-text">${abv}</span>
            </p>
          </div>
          <div class="col-lg-9">
            <p>
              And Our tip:
              <span class="tips-text">${brewers_tips}</span>
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

prevPage.addEventListener("click", () => {
  page--;
  fetchApi();
});
nextPage.addEventListener("click", () => {
  page++;
  fetchApi();
});

fetchApi();

async function feetchBeer(id) {
  let response;
  response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  let results = await response.json();
  console.log(results);
}

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollToTop.classList.add("active");
  } else {
    scrollToTop.classList.remove("active");
  }
});
