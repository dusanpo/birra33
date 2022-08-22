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
  <div class="card text-center">
<div class="card-body bg-primary text-white">
<img class="card-img-top" src=${result.image_url} alt="">
<p>  Some text</p>
</div>
<div class="card-footer">
<h5>
<a href="#" class="pt-3"> Add to Card</a>
</h5>
</div>
  </div>
</div>
  
  `;
  });
  cardWrapper.innerHTML = generatedHTML;
}
