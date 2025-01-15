import React from "react";

export const ShopListItemCard = ({ doll }) => {
  return (
    <div
      key={doll.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col h-full"
    >
      <div className="w-full h-64 flex items-center justify-center bg-gray-100">
        <img
          src={doll.img}
          alt={doll.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 hover:text-red-500 transition-colors duration-300">
            {doll.name}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {doll.originalPrice ? (
              <span>
                <span className="line-through mr-2 text-gray-500">
                  {doll.currency}
                  {doll.originalPrice}
                </span>
                <span className="font-bold text-green-600">
                  {doll.currency}
                  {doll.price}
                </span>
              </span>
            ) : (
              <span className="font-bold text-gray-800">
                {doll.currency}
                {doll.price}
              </span>
            )}
          </p>
        </div>
        <a
          href={doll.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300 mt-auto"
        >
          View Details
        </a>
      </div>
    </div>
  );
};
