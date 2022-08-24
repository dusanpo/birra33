const cardWrapper = document.querySelector(".card-wrapper");
const modal = document.getElementById("modal");
const modalShow = document.querySelector(".modal-style");

document.addEventListener("click", function () {
  const cards = document.querySelector(".cards");
  cards.addEventListener("click", openModal);
  console.log(cards);
  document.querySelector(".close-btn").addEventListener("click", closeModal);
});

async function fetchAPI() {
  const baseURL = "https://api.punkapi.com/v2/beers?page=1&per_page=9";
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data);
  getData(data);
  getModal(data);
}
fetchAPI();

function getData(results) {
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
  });
  cardWrapper.innerHTML = generatedHTML;
}


function getModal(results) {
  let generated = "";
  results.map(result => {
    generated += `
 <div class="modal-content">
        <span class="close-btn">&times;</span>
        <div class="d-flex justify-content-between header-modal">
          <h3>AB: ${result.ph}</h3>
          <p>${result.name}</p>
        </div>
        <hr />
        <div class="body-modal">
          <p>With us since: <span class="text">${result.first_brewed}</span></p>
          <p class="text">${result.description}</p>
          <p>It goes great width:</p>
          <p class="text">${result.food_pairing[0]}</p>
        </div>
        <hr />
        <div class="footer-modal">
          <div class="row">
            <div class="col-lg-3">
              <p>Abv:<br>
              <span class="text">${result.abv}</span>
              </p>
            </div>
            <div class="col-lg-9">
              <p>
                And Our tip:
                <span class="text">${result.brewers_tips}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
 `;
  });
  modalShow.innerHTML = generated;
}

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
