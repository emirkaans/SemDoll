"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { isAlreadyInWishlist, toggleWishlist } from "@/app/utils/utils";

export const ShopListItemCard = ({ doll, onWishlist, updateWishlist }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLiked(isAlreadyInWishlist(doll.id));
    }
  }, [doll.id]);

  const toggleButton = () => {
    toggleWishlist(doll.id);
    setIsLiked(!isLiked);

    if (updateWishlist) {
      updateWishlist();
    }
  };

  if (!isLiked && onWishlist) return null;

  return (
    <div className="relative flex h-full min-w-64 max-w-80 flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="absolute right-3 top-3 z-10">
        <button
          aria-label="Add to Wishlist"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-200"
          onClick={toggleButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "#b62000" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#b62000"
            className={`h-6 w-6 ${isLiked ? "text-red-500" : "text-gray-500"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75a5.625 5.625 0 00-4.5 2.343A5.625 5.625 0 007.5 3.75C4.85 3.75 3 5.75 3 8.25c0 5.25 9 10.5 9 10.5s9-5.25 9-10.5c0-2.5-1.85-4.5-4.5-4.5z"
            />
          </svg>
        </button>
      </div>

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
