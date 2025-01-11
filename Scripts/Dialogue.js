// max warning =========================
let maxWarning = document.getElementById("maxWarning");
let load = document.getElementById("load");
maxWarning.addEventListener("click", () => {
  maxWarning.style.opacity = 0;
});
function MaxWarning() {
  maxWarning.style.opacity = 1;
  load.style.width = "0px";
  let loading = setInterval(() => {
    let width = parseInt(load.style.width);
    load.style.width = `${width + 10}px`;

    if (width >= 290) {
      clearInterval(loading);
    }
  }, 100);
  setTimeout(() => {
    maxWarning.style.opacity = 0;
  }, 3000);
}

// cartDialogue, signDialogue =========================
let cartDialogue = document.querySelector(".BackDark");
let signDialogue = document.querySelector(".BackDark2");
let wishListDialogue = document.querySelector(".BackDark3");

let yourCart = document.getElementById("yourCart");
let SignIn = document.getElementById("signInButton");
let profile = document.getElementById("profile");

yourCart.onclick = () => {
  location.href = "../Pages/cart.html";
};

SignIn.onclick = () => {
  location.href = "../Pages/signIn.html";
};

profile.onclick = () => {
  location.href = "../Pages/profile.html";
};

function CartDialogue() {
  cartDialogue.style.display = "flex";
  setTimeout(() => {
    cartDialogue.style.display = "none";
  }, 2000);
}

function SignDialogue() {
  signDialogue.style.display = "flex";
  setTimeout(() => {
    signDialogue.style.display = "none";
  }, 2000);
}

function WishListDialogue() {
  wishListDialogue.style.display = "flex";
  setTimeout(() => {
    wishListDialogue.style.display = "none";
  }, 2000);
}
