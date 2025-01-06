let homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const container = document.getElementById("wishList");
const container2 = document.getElementById("pofileCart");

fetch("https://dummyjson.com/products/category/laptops?limit=10")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products;
    products.forEach((product) => {
      const item = document.createElement("div");
      item.className = "wishListItem";
      const itemButton = document.createElement("img");
      itemButton.className = "wishListItem_button";
      itemButton.src = "../Assets/addedToWish.png";
      itemButton.width = "40";
      item.appendChild(itemButton);
      const itemImage = document.createElement("img");
      itemImage.src = product.thumbnail;
      itemImage.height = "300";
      itemImage.alt = "item";
      item.appendChild(itemImage);
      const itemDetails = document.createElement("div");
      itemDetails.className = "wishListItem_details";
      const itemTitle = document.createElement("p");
      itemTitle.className = "wishListItem_details_title";
      itemTitle.textContent = product.title;
      itemDetails.appendChild(itemTitle);
      const itemPrice = document.createElement("p");
      itemPrice.textContent = `$${product.price}`;
      itemDetails.appendChild(itemPrice);
      const itemBrandCategoryStock = document.createElement("div");
      itemBrandCategoryStock.className =
        "wishListItem_details_BrandCategoryStock";
      const itemBrand = document.createElement("span");
      itemBrand.textContent = product.brand;
      itemBrandCategoryStock.appendChild(itemBrand);
      const itemVector1 = document.createElement("img");
      itemVector1.src = "../Assets/Vector.png";
      itemBrandCategoryStock.appendChild(itemVector1);
      const itemCategory = document.createElement("span");
      itemCategory.textContent = product.category;
      itemBrandCategoryStock.appendChild(itemCategory);
      const itemVector2 = document.createElement("img");
      itemVector2.src = "../Assets/Vector.png";
      itemBrandCategoryStock.appendChild(itemVector2);
      const itemStock = document.createElement("span");
      itemStock.textContent = "Instock";
      itemStock.style.color = "green";
      itemBrandCategoryStock.appendChild(itemStock);
      itemDetails.appendChild(itemBrandCategoryStock);
      const itemOverview = document.createElement("p");
      itemOverview.className = "wishListItem_details_overview";
      itemOverview.textContent = product.description;
      itemDetails.appendChild(itemOverview);
      item.appendChild(itemDetails);
      container.appendChild(item);
    });
  });

fetch("https://dummyjson.com/products/category/beauty?limit=10")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products;
    products.forEach((product) => {
      const item = document.createElement("div");
      item.className = "wishListItem";
      const itemImage = document.createElement("img");
      itemImage.src = product.thumbnail;
      itemImage.height = "300";
      itemImage.alt = "item";
      item.appendChild(itemImage);
      const itemDetails = document.createElement("div");
      itemDetails.className = "wishListItem_details";
      const itemTitle = document.createElement("p");
      itemTitle.className = "wishListItem_details_title";
      itemTitle.textContent = product.title;
      itemDetails.appendChild(itemTitle);
      const itemPrice = document.createElement("p");
      itemPrice.textContent = `$${product.price}`;
      itemDetails.appendChild(itemPrice);
      const itemBrandCategoryStock = document.createElement("div");
      itemBrandCategoryStock.className =
        "wishListItem_details_BrandCategoryStock";
      const itemBrand = document.createElement("span");
      itemBrand.textContent = product.brand;
      itemBrandCategoryStock.appendChild(itemBrand);
      const itemVector1 = document.createElement("img");
      itemVector1.src = "../Assets/Vector.png";
      itemBrandCategoryStock.appendChild(itemVector1);
      const itemCategory = document.createElement("span");
      itemCategory.textContent = product.category;
      itemBrandCategoryStock.appendChild(itemCategory);
      const itemVector2 = document.createElement("img");
      itemVector2.src = "../Assets/Vector.png";
      itemBrandCategoryStock.appendChild(itemVector2);
      const itemStock = document.createElement("span");
      itemStock.textContent = "Instock";
      itemStock.style.color = "green";
      itemBrandCategoryStock.appendChild(itemStock);
      itemDetails.appendChild(itemBrandCategoryStock);
      const itemOverview = document.createElement("p");
      itemOverview.className = "wishListItem_details_overview";
      itemOverview.textContent = product.description;
      itemDetails.appendChild(itemOverview);
      item.appendChild(itemDetails);
      container2.appendChild(item);
    });
  });
