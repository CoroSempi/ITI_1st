let searchInputDesktop = document.getElementById("searchInput");
let searchInputMobile = document.getElementById("searchInputMobile");

let searchResults = document.getElementById("searchResults");
let searchResults2 = document.getElementById("searchResults2");

const searchInputs = [searchInputDesktop, searchInputMobile];

searchInputs.forEach((input) => {
  input.addEventListener("input", handleSearchInput);
  input.addEventListener("blur", handleSearchInputBlur);
});

function handleSearchInput() {
  const searchInput = this;

  if (searchInput.value.trim()) {
    searchResults.innerHTML = "";
    searchResults2.innerHTML = "";

    searchResults.style.display = "flex";
    searchResults2.style.display = "flex";

    fetchSearchResults(searchInput.value);
  } else {
    searchResults.style.display = "none";
    searchResults2.style.display = "none";
  }
}

function handleSearchInputBlur() {
  setTimeout(() => {
    searchResults.style.display = "none";
    searchResults2.style.display = "none";
    searchInputs.forEach((input) => {
      input.value = "";
    });
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
    const productElement2 = document.createElement("span");

    productElement.addEventListener("click", () => {
      navigateToProductDetails(product.id);
    });
    productElement2.addEventListener("click", () => {
      navigateToProductDetails(product.id);
    });

    productElement.classList.add("searchResults_item");
    productElement2.classList.add("searchResults_item");
    productElement.textContent = product.title;
    productElement2.textContent = product.title;

    searchResults.appendChild(productElement);
    searchResults2.appendChild(productElement2);
  });
}

function navigateToProductDetails(productId) {
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const productDetailsPath = pathname.includes("Pages")
    ? "./productDetails.html"
    : "./Pages/productDetails.html";
  window.location.href = `${productDetailsPath}?id=${productId}`;
}
