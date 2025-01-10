function addToCart(item, quantity = 1) {
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  let product = cartProducts.find((ele) => ele.item.id === item.id);
  if (product) {
    if (product.quantity < 10) {
      product.quantity += quantity;
    } else {
      alert("You can't add more than 10 items");
      return false;
    }
  } else {
    cartProducts.push({ item, quantity });
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
      console.log(product.quantity);
      if (product.quantity <= 0) {
        removeFromCart(id);
        return;
      }
    } else {
      alert("You can't add more than 10 items");
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

function displayCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cartProducts.forEach((product) => {
    const cartCard = document.createElement("div");
    cartCard.classList.add("cartCard");
    cartCard.innerHTML = `
      <img class="cartCard_thumb" src=${product.item.thumbnail} height="300" alt="item" />
      <div class="cartCard_details">
        <p class="cartCard_details_title">${product.item.title}</p>
        <p>$ ${product.item.price}</p>
        <div class="cartCard_details_BrandCategoryStock">
        
          <span>${product.item.brand}</span>
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
          <input value="${product.quantity}" type="text" />
          <button class="plus" data-id="${product.item.id}">+</button>
        </div>
        <img  width="25px" src="../Assets/delete.png" class="delete" data-id="${product.item.id}" />
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
        alert("You can't add more than 10 items");
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
