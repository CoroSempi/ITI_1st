var url = window.location.search;
var newurl = url.substring(1);
var iddetails = newurl.split("=");
id = iddetails[1];

var xhr = new XMLHttpRequest();
xhr.open("GET", `https://dummyjson.com/products/${id}`);

xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
    const product = JSON.parse(xhr.response);

    // wishlist ===================
    let wishlistButton = document.getElementById("wishlistButton");
    let wishlistButton_Icon = document.getElementById("wishlistButton_Icon");
    wishlistButton_Icon.src = wishListExist(product)
      ? "../Assets/addedToWish.png"
      : "../Assets/addToWish.png";

    wishlistButton.addEventListener("click", () => {
      if (addToWishList(product)) {
        wishlistButton_Icon.src = "../Assets/addedToWish.png";
        WishListDialogue();
      } else {
        wishlistButton_Icon.src = "../Assets/addToWish.png";
      }
    });

    displayproduct(product);
  }
};
function displayproduct(product) {
  var productdetails = document.getElementById("productdetails");
  var productimage = document.getElementById("productimage");

  // top of page
  let topData = document.getElementById("topData");
  topData.textContent =
    product.category + " / " + product.brand + " / " + product.title;

  // add element details
  //title&sale
  var title = document.createElement("div");
  var txt = document.createTextNode(product.title);
  title.style.fontWeight = "bold";
  title.style.fontSize = "24px";
  title.style.float = "left";

  var sale = document.createElement("span");
  var salenumber = document.createTextNode(
    product.discountPercentage + "% sale"
  );
  sale.classList.add("sale");
  sale.appendChild(salenumber);
  title.appendChild(txt);
  productdetails.appendChild(title);
  productdetails.appendChild(sale);
  //price
  var price = document.createElement("div");
  var txt1 = document.createTextNode("$" + product.price);
  price.style.fontSize = "28px";
  price.appendChild(txt1);
  productdetails.appendChild(price);

  //rating
  var ratingspan = document.createElement("span");
  var starspan = document.createElement("img");
  ratingspan.classList.add("rate");
  starspan.src = "../Assets/star.png";
  starspan.width = "30";
  ratingspan.appendChild(starspan);
  var rating = document.createTextNode(product.rating);
  ratingspan.appendChild(rating);
  productdetails.appendChild(ratingspan);

  //brandname,category,availability
  var extradetails = document.createElement("div");
  extradetails.classList.add("extra");
  var vector1 = document.createElement("img");
  vector1.src = "../Assets/Vector.png";
  var vector2 = document.createElement("img");
  vector2.src = "../Assets/Vector.png";
  if (product.brand) {
    var brandspan = document.createElement("span");
    var brand = document.createTextNode(product.brand);
    brandspan.appendChild(brand);
    extradetails.appendChild(brandspan);
    extradetails.appendChild(vector1);
  }

  var categoryspan = document.createElement("span");
  var category = document.createTextNode(product.category);
  categoryspan.appendChild(category);

  var availabilityspan = document.createElement("span");
  var availability = document.createTextNode(product.availabilityStatus);
  availabilityspan.style.color = "green";
  availabilityspan.appendChild(availability);

  extradetails.appendChild(categoryspan);
  extradetails.appendChild(vector2);
  extradetails.appendChild(availabilityspan);
  productdetails.appendChild(extradetails);

  var description = document.createElement("div");
  var txt2 = document.createTextNode(product.description);
  description.style.paddingTop = "30px";
  description.style.fontSize = "larger";
  description.style.color = "gray";
  description.appendChild(txt2);
  productdetails.appendChild(description);
  //add to cart
  var cartDetails = document.createElement("div");
  cartDetails.id = "cart-details";
  var AddtoCart = document.createElement("button");
  AddtoCart.classList.add("Addtocart");
  const AddtoCartImg = document.createElement("img");
  AddtoCartImg.src = "../Assets/cartButton.png";
  const AddToCartText = document.createElement("span");
  AddToCartText.textContent = "Add to Cart";

  AddtoCart.addEventListener("click", function () {
    var quantity = parseInt(quantityDisplay.value);
    console.log(quantity);
    // new==========================
    let res = addToCart(product, quantity);
    if (res === true) {
      CartDialogue();
    } else if (res === "not Signed") {
      SignDialogue();
    }
  });

  AddtoCart.appendChild(AddtoCartImg);
  AddtoCart.appendChild(AddToCartText);
  cartDetails.appendChild(AddtoCart);
  productdetails.appendChild(cartDetails);

  //   quantatiy
  var quantitydiv = document.createElement("div");
  quantitydiv.classList.add("quantity-Counter");
  quantitydiv.innerHTML = `<button id="decrease-btn">-</button>
            <input disabled  value="${1}" type="text" id="quantity" />
             <button id="increase-btn"">+</button>`;
  cartDetails.appendChild(quantitydiv);
  const quantityDisplay = document.getElementById("quantity");
  const decreaseBtn = document.getElementById("decrease-btn");
  const increaseBtn = document.getElementById("increase-btn");

  // Increase quantity
  increaseBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityDisplay.value);
    currentValue++;
    quantityDisplay.value = currentValue;
  });

  // Decrease quantity
  decreaseBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityDisplay.value);
    if (currentValue > 1) {
      currentValue--;
      quantityDisplay.value = currentValue;
    }
  });

  //add photo images

  const mainImage = document.getElementById("main-img");
  const gallery = document.getElementById("gallery");

  var images = product.images;
  var productimage = document.createElement("img");
  productimage.src = images[0];
  productimage.height = "300";
  productimage.width = "150";
  mainImage.appendChild(productimage);

  if (images.length > 1) {
    for (let i = 0; i < images.length; i++) {
      const img = document.createElement("img");
      img.src = images[i];
      gallery.appendChild(img);

      img.addEventListener("click", function () {
        productimage.src = images[i];
      });
    }
  } else {
    gallery.style.display = "none";
  }

  //reviews

  let reviews = document.getElementById("reviews");
  product.reviews.forEach((item) => {
    const reviews_item = document.createElement("div");
    reviews_item.classList.add("reviews_item");
    reviews_item.innerHTML = `
          <div class="reviews_item_header">
            <div class="reviews_item_header_Details">
              <p class="userName">${item.reviewerName}</p>
              <span class="dot"></span>
              <p>${item.reviewerEmail}</p>
              <span class="dot"></span>
              <p>${item.date.split("T")[0]}</p>
            </div>
            <div class="reviews_item_header_Rate">
              <p>${item.rating}</p>
              <img src="../Assets/star.png" height="90%" />
            </div>
          </div>
          <div class="reviews_item_content">
           ${item.comment}
          </div>`;

    reviews.appendChild(reviews_item);
  });
}
