const cardWrapper = document.querySelector(".card-wrapper");
const modal = document.getElementById("modal");
const modalShow = document.querySelector(".modal-style");
const inpSearch = document.getElementById("inp-search");

document.addEventListener("click", function () {
  const cards = document.querySelectorAll(".cards");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", openModal);
  }

  document.querySelector(".close-btn").addEventListener("click", closeModal);
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
  getModal(results);
}

fetchApi();

function getModal(shows) {
  console.log(shows);
  shows = shows[0];
  let generated = `
    <div class="modal-content">
        <span class="close-btn">&times;</span>
        <div class="d-flex justify-content-between header-modal">
          <h3>AB: ${shows.ph}</h3>
          <p>${shows.name}</p>
        </div>
        <hr />
        <div class="body-modal">
          <p>With us since: <span class="text">${shows.first_brewed}</span></p>
          <p class="text">${shows.description}</p>
          <p>It goes great width:</p>
          <p class="text">${shows.food_pairing[0]}</p>
        </div>
        <hr />
        <div class="footer-modal">
          <div class="row">
            <div class="col-lg-3">
              <p>Abv:<br>
              <span class="text">${shows.abv}</span>
              </p>
            </div>
            <div class="col-lg-9">
              <p>
                And Our tip:
                <span class="text">${shows.brewers_tips}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
 `;

  modalShow.innerHTML = generated;
}

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
