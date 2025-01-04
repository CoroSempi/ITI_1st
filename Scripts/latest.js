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
      ? "https://dummyjson.com/products?limit=60" // Fetch all products if "all" is selected
      : `https://dummyjson.com/products/category/${category}`; // Fetch products from the selected category
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

      fetchProductsByCategory(categoryTab.id === "all" ? "all" : categoryTab.id);
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
      ? "https://dummyjson.com/products?limit=60"
      : `https://dummyjson.com/products/category/${category}`;
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
    const discountedPrice =
      product.discountPercentage && product.discountPercentage > 0
        ? product.price - (product.price * product.discountPercentage) / 100
        : product.price;

    const card = document.createElement("div");
    card.classList.add("productCard");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("productImg");

    if (product.discountPercentage && product.discountPercentage > 0) {
      const saleBadge = document.createElement("div");
      saleBadge.classList.add("saleBadge");
      saleBadge.textContent = `${Math.round(product.discountPercentage)}% Sale`;
      imgContainer.appendChild(saleBadge);
    }

    const productImg = document.createElement("img");
    productImg.src = product.thumbnail;
    productImg.alt = product.title;
    imgContainer.appendChild(productImg);

    card.appendChild(imgContainer);

    const productInfo = document.createElement("div");
    productInfo.classList.add("productInfo");

    const productTitleAndPrice = document.createElement("h3");
    productTitleAndPrice.innerHTML = `
      ${product.title} - <span class="productPrice">$${discountedPrice.toFixed(2)}</span>
    `;
    productInfo.appendChild(productTitleAndPrice);

    const productCategory = document.createElement("p");
    productCategory.innerHTML = `
      ${product.brand ? `<span>${product.brand}</span>` : ""}
      <span class="divider">|</span>
      <span>${product.category}</span>
      <span class="divider">|</span>
      <span class="${product.stock > 0 ? "inStock" : "outStock"}">
        ${product.stock > 0 ? "InStock" : "OutStock"}
      </span>
    `;
    productInfo.appendChild(productCategory);

    const productDescription = document.createElement("p");
    productDescription.classList.add("description");
    productDescription.textContent = product.description;
    productInfo.appendChild(productDescription);

    card.appendChild(productInfo);

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("addToCart");
    addToCartButton.innerHTML = `
      <img src="../Assets/white_cart.png" style="height:25px;width:25px; margin-right:10px" />
      Add to Cart
    `;
    card.appendChild(addToCartButton);

    productsContainer.appendChild(card);
  });
}

fetchCategories();


// Fetch the categories and initialize the page
fetchCategories();
