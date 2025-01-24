"use client";
import React, { useState } from "react";
import data from "@/data/grandData.json";
import { useParams, useRouter } from "next/navigation";

export const ProductCard = () => {
  const { id } = useParams();
  const router = useRouter();
  const product = data.find((item) => item.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.img.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.img.length) % product.img.length,
    );
  };

  if (!product) {
    router.push("/not-found");

    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Slider */}
          <div className="relative">
            <img
              src={product.img[currentImageIndex]}
              alt={product.name}
              className="h-96 w-full object-cover"
            />
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-2 text-white"
              onClick={handlePreviousImage}
            >
              ❮
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 p-2 text-white"
              onClick={handleNextImage}
            >
              ❯
            </button>
            <div className="mt-2 flex justify-center">
              {product.img.map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 h-3 w-3 rounded-full ${
                    index === currentImageIndex ? "bg-blue-500" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-2 text-lg text-gray-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Materials: {product.materials}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Height: {product.height}
            </p>

            <div className="mt-6 flex space-x-4">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Etsy'de Gör
              </a>
              <button className="bg-pink-600 hover:bg-pink-700 rounded px-4 py-2 text-white">
                Shopier'de Gör
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
