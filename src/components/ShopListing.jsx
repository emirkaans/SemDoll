import React from "react";
import { ShopListItemCard } from "./ShopListItemCard";

export const ShopListing = ({ products }) => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((doll) => (
            <ShopListItemCard key={doll.id} doll={doll} />
          ))}
        </div>
      </div>
    </div>
  );
};
