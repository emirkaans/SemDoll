"use client";
import React, { useEffect, useState } from "react";
import data from "@/data/grandData.json";
import { ShopListItemCard } from "./ShopListItemCard";
import { Gloria_Hallelujah } from "@next/font/google";
import { Button } from "./Button";
import { getWishlistProducts } from "@/app/utils/utils";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

export const WishlistListing = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    setWishlistProducts(getWishlistProducts());

    const handleStorageChange = () => {
      setWishlistProducts(getWishlistProducts());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const selectedIdsSet = new Set(wishlistProducts);
  const filteredProducts = data.filter((product) =>
    selectedIdsSet.has(product.id),
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      {filteredProducts.length === 0 ? (
        <>
          <h1
            className={`${gloria.className} mb-12 text-2xl text-rose-800 md:text-3xl lg:text-4xl`}
          >
            Looks like your wishlist is empty.
          </h1>
          <Button href="/shop" text="Find something you love!" />
        </>
      ) : (
        <>
          <h1 className={`${gloria.className} my-8 text-4xl text-rose-800`}>
            My Wishlist ({filteredProducts.length})
          </h1>
          <div className="container px-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((doll) => (
                <ShopListItemCard
                  key={doll.id}
                  doll={doll}
                  onWishlist={true}
                  updateWishlist={() =>
                    setWishlistProducts(getWishlistProducts())
                  }
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
