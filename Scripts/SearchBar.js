let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", handleSearchInput);
searchInput.addEventListener("blur", handleSearchInputBlur);

function handleSearchInput() {
  const query = searchInput.value.trim();
  if (query) {
    searchResults.innerHTML = "";
    searchResults.style.display = "flex";
    fetchSearchResults(query);
  } else {
    searchResults.style.display = "none";
  }
}

function handleSearchInputBlur() {
  setTimeout(() => {
    searchResults.style.display = "none";
    searchInput.value = "";
  }, 1000);
}

function fetchSearchResults(query) {
  const url = `https://dummyjson.com/products/search?q=${query}&limit=10`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      renderSearchResults(products);
    });
}

function renderSearchResults(products) {
  products.forEach((product) => {
    const productElement = document.createElement("span");
    productElement.addEventListener("click", () => {
      navigateToProductDetails(product.id);
    });
    productElement.classList.add("searchResults_item");
    productElement.textContent = product.title;
    searchResults.appendChild(productElement);
  });
}

function navigateToProductDetails(productId) {
  window.location.href = `../Pages/productDetails.html?id=${productId}`;
}

// Handle the Header Actions section

let cartIcon = document.getElementById("cartIcon");
let profileIcon = document.getElementById("profileIcon");
let log = document.getElementById("log");
let cartCounterr = document.getElementById("cartCounter");

log.addEventListener("click", () => {
  window.location.href = "../Pages/signIn.html";
  localStorage.removeItem("userName");
  localStorage.removeItem("cartProducts");
  localStorage.removeItem("wishList");
});
let user = localStorage.getItem("userName");
if (user) {
  log.textContent = `Log Out`;
  profileIcon.style.display = "block";
  cartIcon.style.display = "block";
  cartCounterr.style.display = "absoulte";
} else {
  log.textContent = `Log In`;
  profileIcon.style.display = "none";
  cartIcon.style.display = "none";
  cartCounterr.style.display = "none";
}
