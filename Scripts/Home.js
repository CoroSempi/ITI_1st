const topReq = new XMLHttpRequest();
topReq.open("GET", "https://dummyjson.com/products/category/laptops?limit=3");
topReq.send();

const container = document.getElementById("topContainer");

topReq.addEventListener("readystatechange", () => {
  if (topReq.readyState === 4 && topReq.status === 200) {
    let topData = JSON.parse(topReq.response);
    topData = topData.products;
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
        let res = addToCart(topData[i]);
        console.log(res);
        if (res === true) {
          CartDialogue();
        } else if (res === "not Signed") {
          SignDialogue();
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
    let latestData = JSON.parse(latestreq.response);
    latestData = latestData.products;

    latestData.forEach(function (product) {
      const latestCard = document.createElement("div");
      latestCard.classList.add("latestCard");

      latestCard.addEventListener("click", () => {
        window.location.href = `./Pages/productDetails.html?id=${product.id}`;
      });

      const sale = document.createElement("span");
      sale.textContent = "% " + product.discountPercentage;
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
      latestCardTopPrice.textContent = "$" + product.price;
      latestCardTop.appendChild(latestCardTopTitle);
      latestCardTop.appendChild(latestCardTopPrice);
      latestCard.appendChild(latestCardTop);

      const latestCardOverView = document.createElement("p");
      latestCardOverView.classList.add("latestCard_OverView");
      latestCardOverView.textContent =
        product.description.substring(0, 50) + ".. .";
      latestCard.appendChild(latestCardOverView);

      const latestCardBrandCategoryStock = document.createElement("div");
      latestCardBrandCategoryStock.classList.add(
        "latestCard_BrandCategoryStock"
      );
      const latestCardBrand = document.createElement("span");
      latestCardBrand.textContent = product.brand;
      const latestCardBrandIcon = document.createElement("img");
      latestCardBrandIcon.src = "../Assets/Vector.png";
      const latestCardCategory = document.createElement("span");
      latestCardCategory.textContent = product.category;
      const latestCardCategoryIcon = document.createElement("img");
      latestCardCategoryIcon.src = "../Assets/Vector.png";
      const latestCardStock = document.createElement("span");
      latestCardStock.textContent =
        product.stock > 0 ? "Instock" : "outOfStock";
      latestCardStock.style.color = product.stock > 0 ? "green" : "red";
      latestCardBrandCategoryStock.appendChild(latestCardBrand);
      latestCardBrandCategoryStock.appendChild(latestCardBrandIcon);
      latestCardBrandCategoryStock.appendChild(latestCardCategory);
      latestCardBrandCategoryStock.appendChild(latestCardCategoryIcon);
      latestCardBrandCategoryStock.appendChild(latestCardStock);
      latestCard.appendChild(latestCardBrandCategoryStock);

      const latestCardAddToCart = document.createElement("button");
      latestCardAddToCart.addEventListener("click", (event) => {
        event.stopPropagation();
        let res = addToCart(product);
        console.log(res);
        if (res === true) {
          CartDialogue();
        } else if (res === "not Signed") {
          SignDialogue();
        }
      });
      latestCardAddToCart.classList.add("latestCard_AddToCart");
      const latestCardAddToCartIcon = document.createElement("img");
      latestCardAddToCartIcon.src = "../Assets/cartButtonLatest.png";
      latestCardAddToCartIcon.alt = "Cart Icon";
      const latestCardAddToCartText = document.createElement("span");
      latestCardAddToCartText.textContent = "Add to Cart";
      latestCardAddToCart.appendChild(latestCardAddToCartIcon);
      latestCardAddToCart.appendChild(latestCardAddToCartText);
      latestCard.appendChild(latestCardAddToCart);

      latestContainer.appendChild(latestCard);
    });
  }
});
