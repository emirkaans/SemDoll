import React from "react";
import data from "@/data/data.json";

const product = data[0];

export const ProductCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      <img
        className="w-full h-64 object-cover"
        src={product.img}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>
        <div className="mb-4">
          <span className="text-lg font-bold text-gray-900">
            {product.currency}
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {product.currency}
              {product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
          >
            Etsy'de Gör
          </a>
          <button className="inline-block px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded cursor-not-allowed">
            Shopier'de Gör
          </button>
        </div>
      </div>
    </div>
  );
};
