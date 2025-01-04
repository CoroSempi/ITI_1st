let cartDialogue = document.querySelector(".BackDark");
let signDialogue = document.querySelector(".BackDark2");

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
