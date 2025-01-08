const topReq = new XMLHttpRequest();
topReq.open("GET", "https://dummyjson.com/products/category/laptops?limit=3");
topReq.send();
let data;
const container = document.getElementById("topContainer");

topReq.addEventListener("readystatechange", () => {
  if (topReq.readyState === 4 && topReq.status === 200) {
    data = JSON.parse(topReq.response);
    data = data.products;

    for (let i = 0; i < data.length; i++) {
      const homeCard = document.createElement("div");

      homeCard.addEventListener("click", () => {
        window.location.href = `./Pages/productDetails.html?id=${data[i].id}`;
      });

      homeCard.classList.add("homeCard");
      const homeCardThumb = document.createElement("div");
      homeCardThumb.classList.add("homeCard_Thumb");
      const homeCardThumbImg = document.createElement("img");
      homeCardThumbImg.src = data[i].thumbnail;
      homeCardThumbImg.style.width = "130%";
      homeCardThumb.appendChild(homeCardThumbImg);
      homeCard.appendChild(homeCardThumb);

      const homeCardTop = document.createElement("div");
      homeCardTop.classList.add("homeCard_Top");
      const homeCardTopName = document.createElement("span");
      homeCardTopName.textContent = data[i].title;
      const homeCardTopPrice = document.createElement("span");
      homeCardTopPrice.textContent = "$" + data[i].price;
      homeCardTop.appendChild(homeCardTopName);
      homeCardTop.appendChild(homeCardTopPrice);
      homeCard.appendChild(homeCardTop);

      const homeCardOverView = document.createElement("p");
      homeCardOverView.classList.add("homeCard_OverView");
      homeCardOverView.textContent = data[i].description;
      homeCard.appendChild(homeCardOverView);

      const homeCardBrandCategoryStock = document.createElement("div");
      homeCardBrandCategoryStock.classList.add("homeCard_BrandCategoryStock");
      const homeCardBrand = document.createElement("span");
      homeCardBrand.textContent = data[i].brand;
      const homeCardBrandImg = document.createElement("img");
      homeCardBrandImg.src = "./Assets/Vector.png";
      const homeCardCategory = document.createElement("span");
      homeCardCategory.textContent = data[i].category;
      const homeCardCategoryImg = document.createElement("img");
      homeCardCategoryImg.src = "./Assets/Vector.png";
      const homeCardStock = document.createElement("span");
      homeCardStock.style.color = data[0].stock > 0 ? "green" : "red";
      homeCardStock.textContent = data[0].stock > 0 ? "Instock" : "outOfStock";
      homeCardBrandCategoryStock.appendChild(homeCardBrand);
      homeCardBrandCategoryStock.appendChild(homeCardBrandImg);
      homeCardBrandCategoryStock.appendChild(homeCardCategory);
      homeCardBrandCategoryStock.appendChild(homeCardCategoryImg);
      homeCardBrandCategoryStock.appendChild(homeCardStock);
      homeCard.appendChild(homeCardBrandCategoryStock);

      const homeCardBottom = document.createElement("div");
      homeCardBottom.classList.add("homeCard_bottom");
      const homeCardAddToCart = document.createElement("button");
      homeCardAddToCart.addEventListener("click", () => {
        SignDialogue();
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
      homeCardStatRate.textContent = data[i].rating;
      const homeCardStatPurchase = document.createElement("span");
      homeCardStatPurchase.classList.add("purchase");
      homeCardStatPurchase.textContent = `(${data[i].stock})`;
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
