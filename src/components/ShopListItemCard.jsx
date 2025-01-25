"use client";

import React from "react";
import { Button } from "./Button";

export const ShopListItemCard = ({ doll }) => {
  return (
    <div className="flex h-full max-w-80 flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative flex h-64 w-full items-center justify-center">
        <img
          src={doll.img[0]}
          alt={doll.name}
          className="absolute h-full w-full object-cover transition-opacity duration-700 hover:opacity-0"
        />
        <img
          src={doll.img[1]}
          alt={doll.name}
          className="absolute h-full w-full object-cover opacity-0 transition-opacity duration-700 hover:opacity-100"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">
          {doll.name}
        </h2>
        <p className="mb-4 flex items-start text-sm leading-7 text-gray-600 transition">
          <span className="text-green-700 text-xl font-bold">
            {doll.currency === "USD" ? "$" : "TRY"}
            {doll.price}
          </span>
          {doll.price !== doll.originalPrice && (
            <span className="ml-2 font-bold text-gray-400 line-through">
              {doll.currency === "USD" ? "$" : "TRY"}
              {doll.originalPrice}
            </span>
          )}
        </p>

        <Button href={`/shop/${doll.id}`} text="View Details" />
      </div>
    </div>
  );
};
