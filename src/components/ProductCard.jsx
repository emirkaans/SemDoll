"use client";
import React, { useState } from "react";
import data from "@/data/grandData.json";
import { useParams } from "next/navigation";

export const ProductCard = () => {
  const { id } = useParams();
  const product = data.find((item) => item.id === id) || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.img.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.img.length) % product.img.length
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Slider */}
          <div className="relative">
            <img
              src={product.img[currentImageIndex]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={handlePreviousImage}
            >
              ❮
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={handleNextImage}
            >
              ❯
            </button>
            <div className="flex justify-center mt-2">
              {product.img.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 mx-1 rounded-full ${
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
            <p className="text-lg text-gray-600 mt-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm line-through text-gray-400">
              ${product.originalPrice.toFixed(2)}
            </p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Materials: {product.materials}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Height: {product.height}
            </p>

            <div className="flex space-x-4 mt-6">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Etsy'de Gör
              </a>
              <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                Shopier'de Gör
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
