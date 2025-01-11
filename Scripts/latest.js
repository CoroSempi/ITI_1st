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
      var categories = JSON.parse(xhr.responseText); // Parse response to get categories
      displayCategories(categories); // Call function to display categories
      fetchProductsByCategory("all"); // Fetch products for all categories
    }
  };

  xhr.send(); // Send the request
}

// Function to display the list of categories in the UI
function displayCategories(categories) {
  // Add a "All Products" category by default
  categoriesContainer.innerHTML = `
    <div class="category active" id="all">All Products</div>
  `;

  // Loop through the categories and display each as a clickable tab
  categories.slice(0, 9).forEach(function (category) {
    var categoryTab = document.createElement("div");
    categoryTab.className = "category"; // Assign a class for styling
    categoryTab.id = category; // Set the category ID as the tab's ID
    categoryTab.textContent = category; // Set category name as text

    // Event listener to handle category click
    categoryTab.addEventListener("click", function () {
      // Remove active class from all category tabs
      document.querySelectorAll(".category").forEach(function (tab) {
        tab.classList.remove("active");
      });
      categoryTab.classList.add("active"); // Add active class to clicked tab

      // Fetch products for the selected category
      fetchProductsByCategory(categoryTab.id);
    });

    // Append the category tab to the container
    categoriesContainer.appendChild(categoryTab);
  });

  // Event listener for the "All Products" category to show all products
  document.getElementById("all").addEventListener("click", function () {
    document.querySelectorAll(".category").forEach(function (tab) {
      tab.classList.remove("active"); // Remove active class from all tabs
    });
    this.classList.add("active"); // Add active class to "All Products"
    fetchProductsByCategory("all"); // Fetch all products
  });
}

// Function to fetch products based on the selected category
function fetchProductsByCategory(category) {
  var xhr = new XMLHttpRequest();
  // If category is "all", fetch all products; otherwise, fetch specific category
  var url =
    category === "all"
      ? "https://dummyjson.com/products?sortBy=title&order=asc&limit=60"
      : `https://dummyjson.com/products/category/${category}?sortBy=title&order=asc&limit=60`;

  xhr.open("GET", url);

  // Event listener for state change of the request
  xhr.onreadystatechange = function () {
    // When the request is complete and successful
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText); // Parse the response to get products
      displayProducts(response.products || []); // Call function to display products
    }
  };

  xhr.send(); // Send the request
}

// Function to display products in the UI
function displayProducts(products) {
  productsContainer.innerHTML = ""; // Clear existing products in the container

  // Loop through each product and create a product card
  products.forEach(function (product) {
    const latestCard = document.createElement("div");
    latestCard.classList.add("latestCard"); // Add class for styling

    // Add event listener to the product card for click action
    latestCard.addEventListener("click", () => {
      window.location.href = `./productDetails.html?id=${product.id}`; // Navigate to product details page
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
      product.description.substring(0, 50) + ".. .";
    latestCard.appendChild(latestCardOverView);

    // Display product brand, category, and stock availability
    const latestCardBrandCategoryStock = document.createElement("div");
    latestCardBrandCategoryStock.classList.add("latestCard_BrandCategoryStock");
    const latestCardBrand = document.createElement("span");
    latestCardBrand.textContent = product.brand;
    const latestCardCategory = document.createElement("span");
    latestCardCategory.textContent = product.category;
    const latestCardStock = document.createElement("span");
    latestCardStock.textContent = product.stock > 0 ? "Instock" : "outOfStock";
    latestCardStock.style.color = product.stock > 0 ? "green" : "red"; // Color based on stock
    latestCardBrandCategoryStock.appendChild(latestCardBrand);
    latestCardBrandCategoryStock.appendChild(latestCardCategory);
    latestCardBrandCategoryStock.appendChild(latestCardStock);
    latestCard.appendChild(latestCardBrandCategoryStock);

    // Add "Add to Cart" button to the product card
    const latestCardAddToCart = document.createElement("button");
    latestCardAddToCart.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up
      let res = addToCart(product); // Attempt to add product to cart
      if (res === true) {
        CartDialogue(); // Show cart dialogue if successful
      } else if (res === "not Signed") {
        SignDialogue(); // Show sign-in dialogue if user is not signed in
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

// Initialize fetching categories when the script runs
fetchCategories();
