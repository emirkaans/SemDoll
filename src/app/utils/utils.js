export const isAlreadyInWishlist = (id) => {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlist-products") || "[]") || [];

  return wishlistProducts.filter((productId) => productId === id).length > 0;
};

export const toggleWishlist = (id) => {
  let wishlistProducts =
    JSON.parse(localStorage.getItem("wishlist-products") || "[]") || [];

  if (isAlreadyInWishlist(id)) {
    wishlistProducts = wishlistProducts.filter((productId) => productId !== id);
  } else {
    wishlistProducts.push(id);
  }

  localStorage.setItem("wishlist-products", JSON.stringify(wishlistProducts));
};
