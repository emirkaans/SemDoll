export const getWishlistProducts = () => {
  return JSON.parse(localStorage.getItem("wishlist-products") || "[]") || [];
};

export const isAlreadyInWishlist = (id) => {
  const wishlistProducts = getWishlistProducts();

  return wishlistProducts.filter((productId) => productId === id).length > 0;
};

export const toggleWishlist = (id) => {
  let wishlistProducts = getWishlistProducts();

  if (isAlreadyInWishlist(id)) {
    wishlistProducts = wishlistProducts.filter((productId) => productId !== id);
  } else {
    wishlistProducts.push(id);
  }

  localStorage.setItem("wishlist-products", JSON.stringify(wishlistProducts));
};
