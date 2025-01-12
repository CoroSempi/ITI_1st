// Get the container for displaying products
var productsContainer = document.getElementById("products");

// Get the container for displaying categories
var categoriesContainer = document.querySelector(".categories");

// Function to fetch the list of categories from the API
function fetchCategories() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dummyjson.com/products/category-list");

  // Event listener for state change of the request
  xhr.onreadystatechange = function () {
    // When the request is complete and successful
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var categories = JSON.parse(xhr.responseText); // Parse the response to get categories
      displayCategories(categories); // Call function to display categories
      fetchProductsByCategory("all"); // Fetch products for the "all" category
    }
  };

  xhr.send(); // Send the request
}

// Function to display the list of categories in the UI
function displayCategories(categories) {
  // Add a "All Products" category as the default active category
  categoriesContainer.innerHTML = `
    <div class="category active" id="all">All Products</div>
  `;

  // Loop through the categories and display each as a clickable tab
  categories.slice(0, 9).forEach(function (category) {
    var categoryTab = document.createElement("div");
    categoryTab.className = "category"; // Add class for styling
    categoryTab.id = category; // Set the category name as the tab's ID
    categoryTab.textContent = category; // Set the category name as text

    // Event listener to handle category tab click
    categoryTab.addEventListener("click", function () {
      // Remove active class from all category tabs
      document.querySelectorAll(".category").forEach(function (tab) {
        tab.classList.remove("active");
      });
      categoryTab.classList.add("active"); // Add active class to clicked tab

      // Fetch products for the selected category
      fetchProductsByCategory(categoryTab.id);
    });

    // Append the category tab to the categories container
    categoriesContainer.appendChild(categoryTab);
  });

  // Event listener for the "All Products" category to show all products
  document.getElementById("all").addEventListener("click", function () {
    document.querySelectorAll(".category").forEach(function (tab) {
      tab.classList.remove("active"); // Remove active class from all tabs
    });
    this.classList.add("active"); // Add active class to "All Products" tab
    fetchProductsByCategory("all"); // Fetch all products
  });
}

// Function to fetch products based on the selected category
function fetchProductsByCategory(category) {
  var xhr = new XMLHttpRequest();
  // If category is "all", fetch all products; otherwise, fetch products for a specific category
  var url =
    category === "all"
      ? "https://dummyjson.com/products?sortBy=rating&order=asc&limit=60"
      : `https://dummyjson.com/products/category/${category}?sortBy=rating&order=asc&limit=60`;

  xhr.open("GET", url);

  // Event listener for state change of the request
  xhr.onreadystatechange = function () {
    // When the request is complete and successful
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText); // Parse the response to get products
      displayProducts(response.products || []); // Call function to display the products
    }
  };

  xhr.send(); // Send the request
}

// Function to display products in the UI
function displayProducts(products) {
  productsContainer.innerHTML = ""; // Clear any existing products from the container

  // Loop through each product and create a product card
  products.forEach(function (product) {
    const latestCard = document.createElement("div");
    latestCard.classList.add("latestCard"); // Add class for styling

    // Add event listener to product card for click action
    latestCard.addEventListener("click", () => {
      window.location.href = `./productDetails.html?id=${product.id}`; // Navigate to the product details page
    });

    // Add discount percentage to the product card
    const sale = document.createElement("span");
    sale.textContent = "% " + product.discountPercentage;
    sale.classList.add("saleBadge");
    latestCard.appendChild(sale);

    // Create and display the product thumbnail
    const latestCardThumb = document.createElement("div");
    latestCardThumb.classList.add("latestCard_Thumb");
    const latestCardThumbImg = document.createElement("img");
    latestCardThumbImg.src = product.thumbnail;
    latestCardThumbImg.alt = "ProductThumbnail";
    latestCardThumbImg.style.height = "100%";
    latestCardThumb.appendChild(latestCardThumbImg);
    latestCard.appendChild(latestCardThumb);

    // Create and display the product title and price
    const latestCardTop = document.createElement("div");
    latestCardTop.classList.add("latestCard_Top");
    const latestCardTopTitle = document.createElement("span");
    latestCardTopTitle.textContent = product.title;
    const latestCardTopPrice = document.createElement("span");
    latestCardTopPrice.textContent = "$" + product.price;
    latestCardTop.appendChild(latestCardTopTitle);
    latestCardTop.appendChild(latestCardTopPrice);
    latestCard.appendChild(latestCardTop);

    // Display a brief overview of the product description
    const latestCardOverView = document.createElement("p");
    latestCardOverView.classList.add("latestCard_OverView");
    latestCardOverView.textContent =
      product.description.substring(0, 50) + ".. ."; // Show only the first 50 characters of the description
    latestCard.appendChild(latestCardOverView);

    // Display product brand, category, and stock availability
    const latestCardBrandCategoryStock = document.createElement("div");
    latestCardBrandCategoryStock.classList.add("latestCard_BrandCategoryStock");
    const latestCardBrand = document.createElement("span");
    latestCardBrand.textContent = product.brand;
    const latestCardCategory = document.createElement("span");
    latestCardCategory.textContent = product.category;
    const latestCardStock = document.createElement("span");
    latestCardStock.textContent = product.stock > 0 ? "Instock" : "outOfStock"; // Show stock status
    latestCardStock.style.color = product.stock > 0 ? "green" : "red"; // Green if in stock, red if out of stock
    latestCardBrandCategoryStock.appendChild(latestCardBrand);
    latestCardBrandCategoryStock.appendChild(latestCardCategory);
    latestCardBrandCategoryStock.appendChild(latestCardStock);
    latestCard.appendChild(latestCardBrandCategoryStock);

    // Add "Add to Cart" button to the product card
    const latestCardAddToCart = document.createElement("button");
    latestCardAddToCart.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up to the card
      let res = addToCart(product); // Attempt to add product to cart
      if (res === true) {
        CartDialogue(); // Show the cart dialogue if the product is added successfully
      } else if (res === "not Signed") {
        SignDialogue(); // Show the sign-in dialogue if the user is not signed in
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

    // Append the product card to the products container
    productsContainer.appendChild(latestCard);
  });
}

// Initialize the process by fetching categories when the script runs
fetchCategories();
