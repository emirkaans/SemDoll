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

export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}
