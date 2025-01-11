function addToWishList(product) {
  const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  const existingItemIndex = wishList.findIndex(
    (item) => item.id === product.id
  );
  if (existingItemIndex !== -1) {
    wishList.splice(existingItemIndex, 1);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    return false;
  } else {
    wishList.push(product);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    return true;
  }
}

function wishListExist(product) {
  const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  const existing = wishList.find((item) => item.id === product.id);

  if (existing) {
    return true;
  } else {
    return false;
  }
}
