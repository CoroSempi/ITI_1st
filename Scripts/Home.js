const topReq = new XMLHttpRequest();
topReq.open("GET", "https://dummyjson.com/products/category/laptops?limit=3");
topReq.send();

const container = document.getElementById("topContainer");

topReq.addEventListener("readystatechange", () => {
  if (topReq.readyState === 4 && topReq.status === 200) {
    let topData = JSON.parse(topReq.response);
    topData = topData.products;

    console.log(topData);

    for (let i = 0; i < topData.length; i++) {
      const homeCard = document.createElement("div");

      homeCard.addEventListener("click", () => {
        window.location.href = `./Pages/productDetails.html?id=${topData[i].id}`;
      });

      homeCard.classList.add("homeCard");
      const homeCardThumb = document.createElement("div");
      homeCardThumb.classList.add("homeCard_Thumb");
      const homeCardThumbImg = document.createElement("img");
      homeCardThumbImg.src = topData[i].thumbnail;
      homeCardThumbImg.style.width = "130%";
      homeCardThumb.appendChild(homeCardThumbImg);
      homeCard.appendChild(homeCardThumb);

      const homeCardTop = document.createElement("div");
      homeCardTop.classList.add("homeCard_Top");
      const homeCardTopName = document.createElement("span");
      homeCardTopName.textContent = topData[i].title;
      const homeCardTopPrice = document.createElement("span");
      homeCardTopPrice.textContent = "$" + topData[i].price;
      homeCardTop.appendChild(homeCardTopName);
      homeCardTop.appendChild(homeCardTopPrice);
      homeCard.appendChild(homeCardTop);

      const homeCardOverView = document.createElement("p");
      homeCardOverView.classList.add("homeCard_OverView");
      homeCardOverView.textContent = topData[i].description;
      homeCard.appendChild(homeCardOverView);

      const homeCardBrandCategoryStock = document.createElement("div");
      homeCardBrandCategoryStock.classList.add("homeCard_BrandCategoryStock");
      const homeCardBrand = document.createElement("span");
      homeCardBrand.textContent = topData[i].brand;
      const homeCardBrandImg = document.createElement("img");
      homeCardBrandImg.src = "./Assets/Vector.png";
      const homeCardCategory = document.createElement("span");
      homeCardCategory.textContent = topData[i].category;
      const homeCardCategoryImg = document.createElement("img");
      homeCardCategoryImg.src = "./Assets/Vector.png";
      const homeCardStock = document.createElement("span");
      homeCardStock.style.color = topData[i].stock > 0 ? "green" : "red";
      homeCardStock.textContent =
        topData[i].stock > 0 ? "Instock" : "outOfStock";
      homeCardBrandCategoryStock.appendChild(homeCardBrand);
      homeCardBrandCategoryStock.appendChild(homeCardBrandImg);
      homeCardBrandCategoryStock.appendChild(homeCardCategory);
      homeCardBrandCategoryStock.appendChild(homeCardCategoryImg);
      homeCardBrandCategoryStock.appendChild(homeCardStock);
      homeCard.appendChild(homeCardBrandCategoryStock);

      const homeCardBottom = document.createElement("div");
      homeCardBottom.classList.add("homeCard_bottom");
      const homeCardAddToCart = document.createElement("button");

      homeCardAddToCart.addEventListener("click", (event) => {
        event.stopPropagation();
        if (addToCart(topData[i])) {
          CartDialogue();
        }
      });
      homeCardAddToCart.classList.add("homeCard_AddToCart");
      const homeCardAddToCartImg = document.createElement("img");
      homeCardAddToCartImg.src = "./Assets/cartButton.png";
      homeCardAddToCartImg.alt = "";
      const homeCardAddToCartText = document.createElement("span");
      homeCardAddToCartText.textContent = "Add to Cart";
      homeCardAddToCart.appendChild(homeCardAddToCartImg);
      homeCardAddToCart.appendChild(homeCardAddToCartText);
      homeCardBottom.appendChild(homeCardAddToCart);

      const homeCardStat = document.createElement("div");
      homeCardStat.classList.add("homeCard_Stat");
      const homeCardStatStar = document.createElement("img");
      homeCardStatStar.src = "./Assets/star.png";
      const homeCardStatRate = document.createElement("span");
      homeCardStatRate.classList.add("Rate");
      homeCardStatRate.textContent = topData[i].rating;
      const homeCardStatPurchase = document.createElement("span");
      homeCardStatPurchase.classList.add("purchase");
      homeCardStatPurchase.textContent = `(${topData[i].stock})`;
      homeCardStat.appendChild(homeCardStatStar);
      homeCardStat.appendChild(homeCardStatRate);
      homeCardStat.appendChild(homeCardStatPurchase);
      homeCardBottom.appendChild(homeCardStat);
      homeCard.appendChild(homeCardBottom);
      container.appendChild(homeCard);
    }
  }
});

// change main cover
let cover = document.getElementById("TopCover");
let i = 1;
setInterval(() => {
  cover.src = `../Assets/home${i}.png`;
  if (i == 3) {
    i = 0;
  }
  i++;
}, 2000);

// Initialize cart counter
const cartCounter = document.getElementById("cartCounter");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
cartCounter.textContent = cartProducts.length || 0;

let latestProducts = document.getElementById("latestProducts");
let latestContainer = document.getElementById("latestContainer");
let currentIndex = 0;

const latestreq = new XMLHttpRequest();

latestreq.open("GET", "https://dummyjson.com/products?sortBy=title&order=asc");
latestreq.send();

function moveSlide(direction) {
  const cards = document.querySelectorAll(".latestCard");
  const totalCards = cards.length;
  const cardWidth = 320;
  currentIndex = (currentIndex + direction + totalCards) % totalCards;
  const offset = -currentIndex * cardWidth;
  latestContainer.style.transform = `translateX(${offset}px)`;
}

latestreq.addEventListener("readystatechange", () => {
  if (latestreq.readyState === 4 && latestreq.status === 200) {
    data = JSON.parse(latestreq.response);
    data = data.products;
    data.forEach((product) => {
      const latestCard = document.createElement("div");
      latestCard.classList.add("latestCard");

      latestCard.addEventListener("click", () => {
        window.location.href = `./Pages/productDetails.html?id=${topData[i].id}`;
      });

      const sale = document.createElement("span");
      sale.textContent = `% ${product.discountPercentage}`;
      sale.classList.add("saleBadge");
      latestCard.appendChild(sale);

      const latestCardThumb = document.createElement("div");
      latestCardThumb.classList.add("latestCard_Thumb");
      const latestCardThumbImg = document.createElement("img");
      latestCardThumbImg.src = product.thumbnail;
      latestCardThumbImg.alt = "ProductThumbnail";
      latestCardThumbImg.style.height = "100%";
      latestCardThumb.appendChild(latestCardThumbImg);
      latestCard.appendChild(latestCardThumb);

      const latestCardTop = document.createElement("div");
      latestCardTop.classList.add("latestCard_Top");
      const latestCardTopTitle = document.createElement("span");
      latestCardTopTitle.textContent = product.title;
      const latestCardTopPrice = document.createElement("span");
      latestCardTopPrice.textContent = `$${product.price}`;
      latestCardTop.appendChild(latestCardTopTitle);
      latestCardTop.appendChild(latestCardTopPrice);
      latestCard.appendChild(latestCardTop);

      const latestCardOverView = document.createElement("p");
      latestCardOverView.classList.add("latestCard_OverView");
      latestCardOverView.textContent = `${product.description}`;
      latestCard.appendChild(latestCardOverView);

      const latestCardBottom = document.createElement("div");
      latestCardBottom.classList.add("latestCard_Bottom");
      const latestCardAddToCart = document.createElement("button");
      latestCardAddToCart.addEventListener("click", (event) => {
        event.stopPropagation();
        if (addToCart(product)) {
          CartDialogue();
        }
      });

      latestCardAddToCart.classList.add("latestCard_AddToCart");
      const latestCardAddToCartImg = document.createElement("img");
      latestCardAddToCartImg.src = "./Assets/cartButton.png";
      latestCardAddToCartImg.alt = "";
      const latestCardAddToCartText = document.createElement("span");
      latestCardAddToCartText.textContent = "Add to Cart";
      latestCardAddToCart.appendChild(latestCardAddToCartImg);
      latestCardAddToCart.appendChild(latestCardAddToCartText);
      latestCardBottom.appendChild(latestCardAddToCart);
      latestCard.appendChild(latestCardBottom);
      latestContainer.appendChild(latestCard);
    });
  }
});
