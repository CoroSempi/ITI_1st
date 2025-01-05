let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", handleSearchInput);
searchInput.addEventListener("blur", handleSearchInputBlur);

function handleSearchInput() {
  if (searchInput.value) {
    searchResults.style.display = "flex";
    searchResults.innerHTML = "";
    fetchSearchResults(searchInput.value);
  } else {
    searchResults.style.display = "none";
  }
}

function handleSearchInputBlur() {
  setTimeout(() => {
    searchResults.style.display = "none";
    this.value = "";
  }, 1000);
}

function fetchSearchResults(query) {
  const url = `https://dummyjson.com/products/search?q=${query}&limit=10`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      renderSearchResults(products);
    })
    .catch((error) => console.error(error));
}

function renderSearchResults(products) {
  products.forEach((product) => {
    const productElement = document.createElement("span");
    productElement.addEventListener("click", () => {
      const productId = product.id;
      const url = new URL(window.location.href);
      const pathname = url.pathname;
      const productDetailsPath = pathname.includes("index.html")
        ? "./Pages/productDetails.html"
        : "./productDetails.html";
      window.location.href = `${productDetailsPath}?id=${productId}`;
    });
    productElement.classList.add("searchResults_item");
    productElement.textContent = product.title;
    searchResults.appendChild(productElement);
  });
}
