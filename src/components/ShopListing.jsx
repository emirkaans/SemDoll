import React from "react";
import data from "@/data/grandData.json";
import { ShopListItemCard } from "./ShopListItemCard";

export const ShopListing = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((doll) => (
            <ShopListItemCard key={doll.id} doll={doll} />
          ))}
        </div>
      </div>
    </div>
  );
};
