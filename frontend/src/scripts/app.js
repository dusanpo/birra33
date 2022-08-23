const cardWrapper = document.querySelector(".card-wrapper");
const modal = document.getElementById("modal");
const modalStart = document.getElementById("modalClick");
const modalClose = document.querySelector(".close-btn");




modalStart.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);

async function fetchAPI() {
  const baseURL = "https://api.punkapi.com/v2/beers?page=1&per_page=9";
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data);
  getData(data);
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

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
