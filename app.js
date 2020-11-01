'use strict';

//create constructor for each product with name & file path of image
//track votes
//25 rounds (keep global)
//votes & views 

//randomly generate three unique product images

//display randomly selected product images side by side

//event listener where images are displayed

//once click thru product, generate three new

//global variables
var products = [];
var totalClicksAllowed = 5;
var clicks = 0;
var productContainer = document.getElementById('product-container');
var productOne = document.getElementById('product-one');
var productTwo = document.getElementById('product-two');
var productThree = document.getElementById('product-three');
var resultList = document.getElementById('list');
//constructor
function Product(imgName){
  this.imgName = imgName;
  this.src = `img/${imgName}.jpg`;
  this.views = 0;
  this.votes = 0;
  products.push(this);
}
//executable code
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

//randomizer function
function getRandomProductAtIndex(){
  return Math.floor(Math.random() * products.length);
}

var currentlyShowing = [];

function renderProducts(){
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
  do {
    var productImageOne = getRandomProductAtIndex();
    var productImageTwo = getRandomProductAtIndex();
    var productImageThree = getRandomProductAtIndex();
  }

  while((productImageOne === productImageTwo) || (productImageOne === productImageThree) || (productImageTwo === productImageThree));

  productOne.src = products[productImageOne].src;
  productOne.alt = products[productImageOne].imgName;
  products[productImageOne].views++;


  productTwo.src = products[productImageTwo].src;
  productTwo.alt = products[productImageTwo].imgName;
  products[productImageTwo].views++;


  productThree.src = products[productImageThree].src;
  productThree.alt = products[productImageThree].imgName;
  products[productImageThree].views++;

  currentlyShowing.push(productImageOne, productImageTwo, productImageThree);

}


// console.log('currently showing:' + currentlyShowing);

function renderResults(){
  for (var i = 0; i < products.length; i++){
    var li = document.createElement('li');
    li.textContent = `${products[i].imgName} had ${products[i].votes} votes and was seen ${products[i].views} times`;
    resultList.appendChild(li);
  }
}

renderProducts();

function handleClick(event){
  var clickedProduct = event.target.alt;
  clicks++;

  console.log('this is clicked product' , clickedProduct);
  for(var i=0; i < products.length; i++){
    if (clickedProduct === products[i].imgName){
      console.log('product[i].name:' , products[i].imgName);
      products[i].votes++;
    }
  }

  renderProducts();
  if (clicks === totalClicksAllowed){
    productContainer.removeEventListener('click', handleClick);
    renderResults();
  }
}



productContainer.addEventListener('click', handleClick);
