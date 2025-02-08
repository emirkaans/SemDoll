"use client";

import React, { useState, useEffect } from "react";
import data from "@/data/grandData.json";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { descriptions } from "@/constants/constants";
import { isAlreadyInWishlist, toggleWishlist } from "@/app/utils/utils";
import { motion } from "framer-motion";

export const ProductDetailCard = ({ id }) => {
  const router = useRouter();
  const product = data.find((item) => item.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLiked(isAlreadyInWishlist(product.id));
    }
  }, [product.id]);

  const toggleButton = () => {
    setIsLiked(!isLiked);
    toggleWishlist(product.id);
  };

  if (!product) {
    router.push("/not-found");
    return null;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.img.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.img.length) % product.img.length,
    );
  };

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center md:px-6 md:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-7xl bg-white p-2 shadow-xl md:grid md:grid-cols-5 md:px-10 md:py-5 lg:gap-10 lg:px-20 lg:py-10">
        {/* Left Section: Slider */}
        <div className="flex flex-col items-center justify-center md:col-span-3">
          <div className="relative w-full overflow-hidden rounded-lg lg:h-[500px]">
            {/* Slider Wrapper */}
            <div
              className="flex h-full w-full transition-transform duration-500"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {product.img.map((image, index) => (
                <div
                  key={index}
                  className="h-full w-full flex-shrink-0 self-center"
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full p-3 text-lg"
              onClick={handlePreviousImage}
            >
              ❮
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full p-3 text-lg"
              onClick={handleNextImage}
            >
              ❯
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 hidden justify-center gap-x-2 lg:flex">
            {product.img.map((image, index) => (
              <button
                key={index}
                className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                  index === currentImageIndex
                    ? "border-rose-400"
                    : "border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col justify-between rounded-lg p-1 md:col-span-2 md:p-3 lg:p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-2xl font-bold text-gray-600">
                ${product.price.toFixed(2)}
              </p>
              {product.price !== product.originalPrice && (
                <p className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
              <button
                aria-label="Add to Wishlist"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-200"
                onClick={toggleButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isLiked ? "#b62000" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#b62000"
                  className={`h-8 w-8 ${isLiked ? "text-red-500" : "text-gray-500"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75a5.625 5.625 0 00-4.5 2.343A5.625 5.625 0 007.5 3.75C4.85 3.75 3 5.75 3 8.25c0 5.25 9 10.5 9 10.5s9-5.25 9-10.5c0-2.5-1.85-4.5-4.5-4.5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {product.materials && (
            <p className="mt-6 text-sm text-gray-500">
              Materials: {product.materials}
            </p>
          )}
          {product.height && (
            <p className="mt-2 text-sm text-gray-500">
              Height: {product.height}
            </p>
          )}
          <p className="my-6 text-lg text-gray-700">
            {descriptions[product.type]}
          </p>

          <Button href={product.url} text="View on Etsy" isBlank={true} />
        </div>
      </div>
    </motion.div>
  );
};
