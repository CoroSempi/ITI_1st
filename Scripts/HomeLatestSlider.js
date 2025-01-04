let latestProducts = document.getElementById("latestProducts");
let latestContainer = document.getElementById("latestContainer");
let currentIndex = 0;

const latestreq = new XMLHttpRequest();
var data;
latestreq.open(
  "GET",
  "https://dummyjson.com/products?sortBy=Category&order=asc"
);
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
      latestCardBrandIcon.src = "./Assets/Vector.png";
      const latestCardCategory = document.createElement("span");
      latestCardCategory.textContent = product.category;
      const latestCardCategoryIcon = document.createElement("img");
      latestCardCategoryIcon.src = "./Assets/Vector.png";
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
      latestCardAddToCart.addEventListener("click", () => {
        CartDialogue();
      });
      latestCardAddToCart.classList.add("latestCard_AddToCart");
      const latestCardAddToCartIcon = document.createElement("img");
      latestCardAddToCartIcon.src = "./Assets/cartButtonLatest.png";
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
