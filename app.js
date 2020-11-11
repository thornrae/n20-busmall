'use strict';

//global variables
var products = [];
var totalClicksAllowed = 25;
var clicks = 0;
var productContainer = document.getElementById('product-container');
var productOne = document.getElementById('product-one');
var productTwo = document.getElementById('product-two');
var productThree = document.getElementById('product-three');
// var resultList = document.getElementById('list');

//constructor
function Product(imgName){
  this.imgName = imgName;
  this.src = `img/${imgName}.jpg`;
  this.views = 0;
  this.votes = 0;
  products.push(this);
}

var retrievedResults = localStorage.getItem('prodcutResults');

if(retrievedResults){
  var parsedProductResults = JSON.parse(retrievedResults);
  products = parsedProductResults;
} else {
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb');
  new Product('water-can');
  new Product('wine-glass');
}

//randomizer function
function getRandomProductAtIndex(){
  return Math.floor(Math.random() * products.length);
}

var currentlyShowing = [];


function populateRender () {
  while(currentlyShowing.length > 3) {
    currentlyShowing.shift();
  }
  while(currentlyShowing.length < 6){
    var uniqueProduct = getRandomProductAtIndex();
    while (currentlyShowing.includes(uniqueProduct)){
      uniqueProduct = getRandomProductAtIndex();
    }
    currentlyShowing.push(uniqueProduct);
  }
  console.log('currentlyshowing: ', currentlyShowing);
}

function renderProducts(){
  populateRender();

  var productImageOne = currentlyShowing[0];
  var productImageTwo = currentlyShowing[1];
  var productImageThree = currentlyShowing[2];


  productOne.src = products[productImageOne].src;
  productOne.alt = products[productImageOne].imgName;
  products[productImageOne].views++;


  productTwo.src = products[productImageTwo].src;
  productTwo.alt = products[productImageTwo].imgName;
  products[productImageTwo].views++;


  productThree.src = products[productImageThree].src;
  productThree.alt = products[productImageThree].imgName;
  products[productImageThree].views++;

  if (clicks === totalClicksAllowed){
    productContainer.removeEventListener('click', handleClick);
    makeResultsChart();

    var productResults = JSON.stringify(products);
    localStorage.setItem('productResults', productResults);
  }
}

renderProducts();

function handleClick(event){
  var clickedProduct = event.target.alt;
  clicks++;

  for(var i=0; i < products.length; i++){
    if (clickedProduct === products[i].imgName){
      products[i].votes++;
    }
  }

  renderProducts();

}



function makeResultsChart() {

  var productViews = [];
  var productVotes= [];

  for(var i=0; i < products.length; i++){
    var singleProductView = products[i].views;
    productViews.push(singleProductView);
  }

  for(var j=0; j < products.length; j++){
    var singleProductVote = products[j].votes;
    productVotes.push(singleProductVote);
  }

  var ctx = document.getElementById('resultsChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-Duck', 'Dragon', 'Pen', 'Pet Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water Can', 'Wine Glass'],
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor:
        'rgba(255, 99, 132, 0.2)',
        borderColor:
        'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '# of Votes',
        data: productVotes,
        backgroundColor:
        'rgba(54, 162, 235, 0.2)',
        borderColor:
        'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

productContainer.addEventListener('click', handleClick);
