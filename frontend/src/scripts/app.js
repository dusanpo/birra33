const cardWrapper = document.querySelector(".card-wrapper");

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
    <div class="card text-center cards">
      <div class="card-body card-main">
        <img class="card-img-top" src=${result.image_url} alt="image" />
        <p>$${result.abv}</p>
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
