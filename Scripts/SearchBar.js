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
  const pathname = window.location.pathname;
  const productDetailsPath = pathname.includes("Pages")
    ? "./productDetails.html"
    : "./Pages/productDetails.html";
  window.location.href = `${productDetailsPath}?id=${productId}`;
}
