import React from "react";
import data from "@/data/data.json";
import { ShopListItemCard } from "./ShopListItemCard";

export const ShopListing = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Shop Waldorf Dolls
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((doll, index) => (
            <ShopListItemCard key={index} doll={doll} />
          ))}
        </div>
      </div>
    </div>
  );
};
