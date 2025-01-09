function addToWishList(id) {
  const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  const existingItem = wishList.find((item) => item.id === id);
  if (existingItem) {
    return false;
  } else {
    wishList.push({ id });
    localStorage.setItem("wishList", JSON.stringify(wishList));
    return true;
  }
}
