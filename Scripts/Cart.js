function cartCounter(
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || []
) {
  let counter = document.getElementById("cartCounter");
  counter.textContent = cartProducts.length;
}
cartCounter();

function addToCart(item, quantity = 1) {
  if (!localStorage.getItem("userName")) {
    return "not Signed";
  }
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let product = cartProducts.find((ele) => ele.item.id === item.id);
  if (product) {
    if (product.quantity + quantity > 10) {
      MaxWarning();
      return false;
    }
    product.quantity += quantity;
  } else {
    if (quantity > 10) {
      MaxWarning();
      return false;
    }
    cartProducts.push({ item, quantity });
    cartCounter(cartProducts);
  }
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  return true;
}
function updateCart(id, quantity = 1) {
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let product = cartProducts.find((ele) => ele.item.id == id);
  console.log(product);
  if (product) {
    if (product.quantity <= 10) {
      product.quantity += quantity;
      if (product.quantity <= 0) {
        removeFromCart(id);
        return;
      }
    } else {
      MaxWarning();
      return false;
    }
  }
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  displayCart();
  return true;
}

function removeFromCart(productId) {
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cartProducts = cartProducts.filter((product) => {
    return product.item.id != productId;
  });
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  console.log(cartProducts);
  displayCart();
}

function checkout() {
  if (confirm("Are you sure you want to checkout?")) {
    alert("Checkout process initiated!");
    localStorage.removeItem("cartProducts");
  }
}

//Cart Summary ================
let subTotal = document.getElementById("subTotal");
let afterDiscount = document.getElementById("afterDiscount");
let finalTotal = document.getElementById("finalTotal");

function orderSummary() {
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let subTotal_ = 0;

  for (const product of cartItems) {
    subTotal_ += product.item.price * product.quantity;
  }
  afterDiscount.textContent = "$ " + Math.ceil(subTotal_ * 0.1);
  subTotal.textContent = "$ " + Math.ceil(subTotal_);
  finalTotal.textContent = subTotal_
    ? "$ " + (Math.ceil(subTotal_ * 0.9) + 20)
    : "$ " + 0;
}
orderSummary();

// displayCart ================
function displayCart() {
  cartCounter();
  orderSummary();
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cartProducts.forEach((product) => {
    const cartCard = document.createElement("div");
    cartCard.classList.add("cartCard");
    cartCard.innerHTML = `
      <img class="cartCard_thumb" src=${
        product.item.thumbnail
      } height="300" alt="item" />
      <div class="cartCard_details">
        <p class="cartCard_details_title">${product.item.title}</p>
        <p>$ ${product.item.price}</p>
        <div class="cartCard_details_BrandCategoryStock">
        
          <span>${product.item.brand ? product.item.brand : "Brandless"}</span>
          <img src="../Assets/Vector.png" />
          <span>${product.item.category}</span>
          <img src="../Assets/Vector.png" />
          <span style="color: green">Instock</span>
        </div>
        <p class="cartCard_details_overview">
      ${product.item.description}
        </p>
      </div>
      <div class="cartCard_actions">
        <div class="cartCard_actions_counter">
          <button class="minus" data-id="${product.item.id}">-</button>
          <input value="${product.quantity}" disabled  type="text" />
          <button class="plus" data-id="${product.item.id}">+</button>
        </div>
        <img  width="25px" src="../Assets/delete.png" class="delete" data-id="${
          product.item.id
        }" />
      </div>
      <div class="saleBadge">${product.item.discountPercentage}%</div>
    `;
    cartList.appendChild(cartCard);
  });

  const minusButtons = document.querySelectorAll(".minus");
  const plusButtons = document.querySelectorAll(".plus");
  const deleteButtons = document.querySelectorAll(".delete");

  minusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const quantity = parseInt(button.parentNode.querySelector("input").value);
      button.parentNode.querySelector("input").value = quantity - 1;
      updateCart(id, -1);
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const quantity = parseInt(button.parentNode.querySelector("input").value);
      if (quantity < 10) {
        updateCart(id);
      } else {
        MaxWarning();
      }
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}
displayCart();
