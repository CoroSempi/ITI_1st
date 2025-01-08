
    // Get the container for displaying products
    var productsContainer = document.getElementById("products");

    // Get the container for displaying categories
    var categoriesContainer = document.querySelector(".categories");

    // Get the cart counter element
    var cartCounter = document.getElementById("cartCounter");

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
      var latestPageReq = new XMLHttpRequest();
      var url =
        category === "all"
          ? "https://dummyjson.com/products?sortBy=title&order=asc&limit=60"
          : `https://dummyjson.com/products/category/${category}?sortBy=title&order=asc`;
      latestPageReq.open("GET", url);

      latestPageReq.onreadystatechange = function () {
        if (latestPageReq.readyState === 4 && latestPageReq.status >= 200) {
          var response = JSON.parse(latestPageReq.responseText);
          displayProducts(response.products || []);
        }
      };
      latestPageReq.send();
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
        sale.textContent = "%" + product.discountPercentage;
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

        const homeCardBottom = document.createElement("div");
        homeCardBottom.classList.add("homeCard_bottom");
        const latestCardAddToCart = document.createElement("button");

      // مجموعة لتخزين المنتجات الفريدة
let cartItems = new Set();

// تحميل السلة المحفوظة عند تحميل الصفحة
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
cartProducts.forEach(product => cartItems.add(product.id)); // تحديث cartItems بناءً على المنتجات المخزنة
let cartCount = cartProducts.length; // تعيين العدد إلى طول السلة المحفوظة

// تحديث العداد عند تحميل الصفحة
updateCartCounter();

// عند إضافة المنتج إلى السلة
latestCardAddToCart.addEventListener("click", (event) => {
  event.stopPropagation(); // منع الانتقال إلى صفحة تفاصيل المنتج
  if (!cartItems.has(product.id)) { // التحقق من عدم وجود المنتج مسبقًا في السلة
    if (cartCount < 10) {
      cartCount++; // زيادة العدد
      cartItems.add(product.id); // إضافة المنتج إلى مجموعة السلة
      cartProducts.push(product); // إضافة المنتج للسلة المحفوظة
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts)); // حفظ السلة في localStorage
      localStorage.setItem("cartCount", cartCount); // حفظ عدد المنتجات في السلة
      
      updateCartDisplay();
      // تحديث العداد
      updateCartCounter(); 
      // إعادة تحميل الصفحة لتحديث العداد تلقائيًا
      location.reload(); 
    } else {
      alert("Cart is full! Maximum limit of 10 items reached.");
    }
  } else {
    alert("This product is already in your cart!");
  }
});

// دالة لتحديث العداد في السلة
// دالة لتحديث العداد في السلة
function updateCartCounter() {
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.textContent = cartCount; // تحديث العداد بناءً على المنتجات في السلة
  // تحديث العداد مباشرة في الواجهة بعد إضافة المنتج
  cartCounter.innerHTML = cartCount;
}

// دالة لتحديث عرض السلة في الصفحة
function updateCartDisplay() {
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.textContent = cartProducts.length; // تحديث العداد بشكل مباشر
}



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

    // Initialize the page
    fetchCategories();
