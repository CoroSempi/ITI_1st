// Get the container for displaying products
var productsContainer = document.getElementById("products");

// Get the container for displaying categories
var categoriesContainer = document.querySelector(".categories");

// Function to fetch the list of categories
function fetchCategories() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dummyjson.com/products/category-list");

  // Event listener for state change of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete and successful
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      // Parse the response text into JSON format
      var categories = JSON.parse(xhr.responseText);
      // Display the fetched categories in the UI
      displayCategories(categories);
      // Fetch and display all products by default
      fetchProductsByCategory("all");
    }
  };

  // Send the request to the server
  xhr.send();
}

// Function to display the list of categories
function displayCategories(categories) {
  // Add the "All Products" category as the default active tab
  categoriesContainer.innerHTML = `
    <div class="category active" id="all">All Products</div>
  `;

  // Display up to 8 categories from the list
  categories.slice(0, 4).forEach(function (category) {
    // Create a new category tab element
    const categoryTab = document.createElement("div");
    categoryTab.className = "category";
    categoryTab.id = category;
    categoryTab.textContent = category;

    // Add a click event listener to each category tab
    categoryTab.addEventListener("click", function () {
      // Remove the active class from all tabs
      document.querySelectorAll(".category").forEach(function (tab) {
        tab.classList.remove("active");
      });
      // Add the active class to the clicked tab
      categoryTab.classList.add("active");

      // Fetch products based on the selected category
      fetchProductsByCategory(categoryTab.id);
    });

    // Append the category tab to the container
    categoriesContainer.appendChild(categoryTab);
  });

  // Add a click event listener to the "All Products" tab
  document.getElementById("all").addEventListener("click", function () {
    // Remove the active class from all tabs
    document.querySelectorAll(".category").forEach(function (tab) {
      tab.classList.remove("active");
    });
    // Add the active class to the "All Products" tab
    this.classList.add("active");
    // Fetch all products
    fetchProductsByCategory("all");
  });
}
// Function to fetch products based on the selected category
function fetchProductsByCategory(category) {
  var xhr = new XMLHttpRequest();
  var url =
    category === "all"
      ? "https://dummyjson.com/products?sortBy=title&order=asc&limit=60" // Fetch all products if "all" is selected
      : `https://dummyjson.com/products/category/${category}?sortBy=title&order=asc`; // Fetch products from the selected category
  xhr.open("GET", url);

  // Event listener for state change of the request
  xhr.onreadystatechange = function () {
    // Check if the request is complete and successful
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      // Parse the response text into JSON format
      var response = JSON.parse(xhr.responseText);
      // Display the fetched products in the UI
      displayProducts(response.products || []);
    }
  };

  // Send the request to the server
  xhr.send();
}
// Get the container for displaying products
var productsContainer = document.getElementById("products");

// Get the container for displaying categories
var categoriesContainer = document.querySelector(".categories");

// Function to fetch the list of categories
function fetchCategories() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dummyjson.com/products/category-list");

  // Event listener for state change of the request
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var categories = JSON.parse(xhr.responseText);
      displayCategories(categories);
      fetchProductsByCategory("all");
    }
  };
  xhr.send();
}

// Function to display the list of categories
function displayCategories(categories) {
  categoriesContainer.innerHTML = `
    <div class="category active" id="all">All Products</div>
  `;

  categories.slice(0, 9).forEach(function (category) {
    var categoryTab = document.createElement("div");
    categoryTab.className = "category";
    categoryTab.id = category;
    categoryTab.textContent = category;

    categoryTab.addEventListener("click", function () {
      document.querySelectorAll(".category").forEach(function (tab) {
        tab.classList.remove("active");
      });
      categoryTab.classList.add("active");

      fetchProductsByCategory(
        categoryTab.id === "all" ? "all" : categoryTab.id
      );
    });

    categoriesContainer.appendChild(categoryTab);
  });

  document.getElementById("all").addEventListener("click", function () {
    document.querySelectorAll(".category").forEach(function (tab) {
      tab.classList.remove("active");
    });
    this.classList.add("active");
    fetchProductsByCategory("all");
  });
}

// Function to fetch products based on the selected category
function fetchProductsByCategory(category) {
  var xhr = new XMLHttpRequest();
  var url =
    category === "all"
    ? "https://dummyjson.com/products?sortBy=title&order=asc&limit=60" 
    : `https://dummyjson.com/products/category/${category}?sortBy=title&order=asc`; 
  xhr.open("GET", url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText);
      displayProducts(response.products || []);
    }
  };
  xhr.send();
}

// Function to display products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(function (product) {
    const latestCard = document.createElement("div");
    latestCard.classList.add("latestCard");

    latestCard.addEventListener("click", () => {
      window.location.href = `./productDetails.html?id=${product.id}`;
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
    latestCardBrandCategoryStock.classList.add("latestCard_BrandCategoryStock");
    const latestCardBrand = document.createElement("span");
    latestCardBrand.textContent = product.brand;
    const latestCardBrandIcon = document.createElement("img");
    latestCardBrandIcon.src = "../Assets/Vector.png";
    const latestCardCategory = document.createElement("span");
    latestCardCategory.textContent = product.category;
    const latestCardCategoryIcon = document.createElement("img");
    latestCardCategoryIcon.src = "../Assets/Vector.png";
    const latestCardStock = document.createElement("span");
    latestCardStock.textContent = product.stock > 0 ? "Instock" : "outOfStock";
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
    latestCardAddToCartIcon.src = "../Assets/cartButtonLatest.png";
    latestCardAddToCartIcon.alt = "Cart Icon";
    const latestCardAddToCartText = document.createElement("span");
    latestCardAddToCartText.textContent = "Add to Cart";
    latestCardAddToCart.appendChild(latestCardAddToCartIcon);
    latestCardAddToCart.appendChild(latestCardAddToCartText);
    latestCard.appendChild(latestCardAddToCart);

    productsContainer.appendChild(latestCard);
  });
}

fetchCategories();
