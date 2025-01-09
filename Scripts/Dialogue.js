let cartDialogue = document.querySelector(".BackDark");
let signDialogue = document.querySelector(".BackDark2");
let yourCart = document.getElementById("yourCart");

yourCart.onclick = () => {
  location.href = "../Pages/cart.html";
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
