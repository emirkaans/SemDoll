import Link from "next/link";
import React from "react";

const pastelColors = [
  { bg: "bg-rose-100", hover: "hover:bg-rose-200" },
  { bg: "bg-teal-100", hover: "hover:bg-teal-200" },
  { bg: "bg-sky-100", hover: "hover:bg-sky-200" },
  { bg: "bg-indigo-100", hover: "hover:bg-indigo-200" },
  { bg: "bg-yellow-100", hover: "hover:bg-yellow-200" },
  { bg: "bg-lime-100", hover: "hover:bg-lime-200" },
  { bg: "bg-purple-100", hover: "hover:bg-purple-200" },
  { bg: "bg-orange-100", hover: "hover:bg-orange-200" },
  { bg: "bg-cyan-100", hover: "hover:bg-cyan-200" },
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};

export const ShopListItemCard = ({ doll }) => {
  const { bg, hover } = getRandomColor();

  return (
    <div className="flex h-full max-w-80 flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex h-64 w-full items-center justify-center">
        <img
          src={doll.img[0]}
          alt={doll.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <h2 className="mb-3 text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-500">
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

        <Link
          href={`/shop/${doll.id}`}
          className={`rounded-full border-[2px] border-gray-300 ${bg} py-2 text-center font-bold text-stone-800 transition-all duration-300 ${hover}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
