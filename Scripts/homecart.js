
const topReq = new XMLHttpRequest();
topReq.open("GET", "https://dummyjson.com/products/category/laptops?limit=3");
topReq.send();
let data;
const container = document.getElementById("topContainer");

topReq.addEventListener("readystatechange", () => {
  if (topReq.readyState === 4 && topReq.status === 200) {
    data = JSON.parse(topReq.response);
    data = data.products;

    for (let i = 0; i < data.length; i++) {
      const homeCard = document.createElement("div");

      homeCard.addEventListener("click", () => {
        window.location.href = `./Pages/productDetails.html?id=${data[i].id}`;
      });

      homeCard.classList.add("homeCard");
      const homeCardThumb = document.createElement("div");
      homeCardThumb.classList.add("homeCard_Thumb");
      const homeCardThumbImg = document.createElement("img");
      homeCardThumbImg.src = data[i].thumbnail;
      homeCardThumbImg.style.width = "130%";
      homeCardThumb.appendChild(homeCardThumbImg);
      homeCard.appendChild(homeCardThumb);

      const homeCardTop = document.createElement("div");
      homeCardTop.classList.add("homeCard_Top");
      const homeCardTopName = document.createElement("span");
      homeCardTopName.textContent = data[i].title;
      const homeCardTopPrice = document.createElement("span");
      homeCardTopPrice.textContent = "$" + data[i].price;
      homeCardTop.appendChild(homeCardTopName);
      homeCardTop.appendChild(homeCardTopPrice);
      homeCard.appendChild(homeCardTop);

      const homeCardOverView = document.createElement("p");
      homeCardOverView.classList.add("homeCard_OverView");
      homeCardOverView.textContent = data[i].description;
      homeCard.appendChild(homeCardOverView);

      const homeCardBrandCategoryStock = document.createElement("div");
      homeCardBrandCategoryStock.classList.add("homeCard_BrandCategoryStock");
      const homeCardBrand = document.createElement("span");
      homeCardBrand.textContent = data[i].brand;
      const homeCardBrandImg = document.createElement("img");
      homeCardBrandImg.src = "./Assets/Vector.png";
      const homeCardCategory = document.createElement("span");
      homeCardCategory.textContent = data[i].category;
      const homeCardCategoryImg = document.createElement("img");
      homeCardCategoryImg.src = "./Assets/Vector.png";
      const homeCardStock = document.createElement("span");
      homeCardStock.style.color = data[i].stock > 0 ? "green" : "red";
      homeCardStock.textContent = data[i].stock > 0 ? "Instock" : "outOfStock";
      homeCardBrandCategoryStock.appendChild(homeCardBrand);
      homeCardBrandCategoryStock.appendChild(homeCardBrandImg);
      homeCardBrandCategoryStock.appendChild(homeCardCategory);
      homeCardBrandCategoryStock.appendChild(homeCardCategoryImg);
      homeCardBrandCategoryStock.appendChild(homeCardStock);
      homeCard.appendChild(homeCardBrandCategoryStock);

      const homeCardBottom = document.createElement("div");
      homeCardBottom.classList.add("homeCard_bottom");
      const homeCardAddToCart = document.createElement("button");
      const cartItems = new Set(); // مجموعة لتخزين المنتجات الفريدة

      // عند إضافة المنتج إلى السلة
      homeCardAddToCart.addEventListener("click", (event) => {
        event.stopPropagation(); // منع الانتقال إلى صفحة تفاصيل المنتج
        if (!cartItems.has(data[i].id)) { // التحقق من عدم وجود المنتج مسبقًا في السلة
          if (cartCount < 10) {
            cartCount++;
            cartItems.add(data[i].id); // إضافة المنتج إلى مجموعة السلة
            cartCounter.textContent = cartCount;

            // حفظ المنتج في localStorage
           
            const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
            cartProducts.push(data[i]); // إضافة المنتج الجديد للسلة
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts)); // حفظ السلة في localStorage
          } else {
            alert("Cart is full! Maximum limit of 10 items reached.");
          }
        } else {
          alert("This product is already in your cart!");
        }
      });
      homeCardAddToCart.classList.add("homeCard_AddToCart");
      const homeCardAddToCartImg = document.createElement("img");
      homeCardAddToCartImg.src = "./Assets/cartButton.png";
      homeCardAddToCartImg.alt = "";
      const homeCardAddToCartText = document.createElement("span");
      homeCardAddToCartText.textContent = "Add to Cart";
      homeCardAddToCart.appendChild(homeCardAddToCartImg);
      homeCardAddToCart.appendChild(homeCardAddToCartText);
      homeCardBottom.appendChild(homeCardAddToCart);

      const homeCardStat = document.createElement("div");
      homeCardStat.classList.add("homeCard_Stat");
      const homeCardStatStar = document.createElement("img");
      homeCardStatStar.src = "./Assets/star.png";
      const homeCardStatRate = document.createElement("span");
      homeCardStatRate.classList.add("Rate");
      homeCardStatRate.textContent = data[i].rating;
      const homeCardStatPurchase = document.createElement("span");
      homeCardStatPurchase.classList.add("purchase");
      homeCardStatPurchase.textContent = `(${data[i].stock})`;
      homeCardStat.appendChild(homeCardStatStar);
      homeCardStat.appendChild(homeCardStatRate);
      homeCardStat.appendChild(homeCardStatPurchase);
      homeCardBottom.appendChild(homeCardStat);
      homeCard.appendChild(homeCardBottom);
      container.appendChild(homeCard);
    }
  }
});

// change main cover
let cover = document.getElementById("TopCover");
let i = 1;
setInterval(() => {
  cover.src = `../Assets/home${i}.png`;
  if (i == 3) {
    i = 0;
  }
  i++;
}, 2000);

// Initialize cart counter
const cartCounter = document.getElementById("cartCounter");
let cartCount = parseInt(cartCounter.textContent) || 0;







//------------------end

//-----------------start
let latestProducts = document.getElementById("latestProducts");
      let latestContainer = document.getElementById("latestContainer");
      let currentIndex = 0;
      const cartItems = new Set(); // Set to store unique products added to the cart
    
      const latestreq = new XMLHttpRequest();
    
      latestreq.open("GET", "https://dummyjson.com/products?sortBy=title&order=asc");
      latestreq.send();
    
      function moveSlide(direction) {
        const cards = document.querySelectorAll(".latestCard");
        const totalCards = cards.length;
        const cardWidth = 320;
        currentIndex = (currentIndex + direction + totalCards) % totalCards;
        const offset = -currentIndex * cardWidth;
        latestContainer.style.transform = `translateX(${offset}px)`;
      }
    
      latestreq.addEventListener("readystatechange", () => {
        if (latestreq.readyState === 4 && latestreq.status === 200) {
          data = JSON.parse(latestreq.response);
          data = data.products;
          data.forEach((product) => {
            const latestCard = document.createElement("div");
            latestCard.classList.add("latestCard");
    
            latestCard.addEventListener("click", () => {
              event.stopPropagation(); // Prevent triggering the product details navigation
            });
    
            const sale = document.createElement("span");
            sale.textContent = `% ${product.discountPercentage}`;
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
            latestCardTopPrice.textContent = `$${product.price}`;
            latestCardTop.appendChild(latestCardTopTitle);
            latestCardTop.appendChild(latestCardTopPrice);
            latestCard.appendChild(latestCardTop);
    
            const latestCardOverView = document.createElement("p");
            latestCardOverView.classList.add("latestCard_OverView");
            latestCardOverView.textContent = `${product.description}`;
            latestCard.appendChild(latestCardOverView);
    
            const latestCardBottom = document.createElement("div");
            latestCardBottom.classList.add("latestCard_Bottom");
            const latestCardAddToCart = document.createElement("button");
            latestCardAddToCart.addEventListener("click", (event) => {
              event.stopPropagation(); // منع الانتقال إلى صفحة تفاصيل المنتج
              if (!cartItems.has(product.id)) { // التحقق من عدم وجود المنتج مسبقًا في السلة
                if (cartCount < 10) {
                  cartCount++;
                  cartItems.add(product.id); // إضافة المنتج إلى مجموعة السلة
                  cartCounter.textContent = cartCount;
                  // حفظ المنتج في localStorage
                  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
                  cartProducts.push(product); // إضافة المنتج الجديد للسلة
                  localStorage.setItem("cartProducts", JSON.stringify(cartProducts)); // حفظ السلة في localStorage
                } else {
                  alert("Cart is full! Maximum limit of 10 items reached.");
                }
              } else {
                alert("This product is already in your cart!");
              }
            });
            
            latestCardAddToCart.classList.add("latestCard_AddToCart");
            const latestCardAddToCartImg = document.createElement("img");
            latestCardAddToCartImg.src = "./Assets/cartButton.png";
            latestCardAddToCartImg.alt = "";
            const latestCardAddToCartText = document.createElement("span");
            latestCardAddToCartText.textContent = "Add to Cart";
            latestCardAddToCart.appendChild(latestCardAddToCartImg);
            latestCardAddToCart.appendChild(latestCardAddToCartText);
            latestCardBottom.appendChild(latestCardAddToCart);
            latestCard.appendChild(latestCardBottom);
            latestContainer.appendChild(latestCard);
          });
        }
      });