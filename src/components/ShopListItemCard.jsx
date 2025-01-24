import Link from "next/link";
import React from "react";

export const ShopListItemCard = ({ doll }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
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
            <span className="ml-2 text-gray-400 line-through">
              {doll.currency === "USD" ? "$" : "TRY"}
              {doll.originalPrice}
            </span>
          )}
        </p>

        <Link
          href={`/shop/${doll.id}`}
          className="rounded-full border-[2px] border-gray-300 bg-rose-300 py-2 text-center font-bold text-stone-800 transition-all duration-300 hover:border-stone-800 hover:bg-rose-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// import Link from "next/link";
// import React from "react";

// export const ShopListItemCard = ({ doll }) => {
//   return (
//     <div className="flex h-full flex-col overflow-hidden rounded-lg bg-light_pink/15 shadow-md transition-shadow duration-300 hover:shadow-xl">
//       <div className="flex h-64 w-full items-center justify-center">
//         <img
//           src={doll.img[0]}
//           alt={doll.name}
//           className="h-full w-full object-cover"
//         />
//       </div>
//       <div className="flex flex-grow flex-col justify-between p-4">
//         <h2 className="hover:text-red-500 mb-3 text-lg font-semibold text-[#2b2b2b] transition-colors duration-300">
//           {doll.name}
//         </h2>
//         <p className="mb-4 flex items-start text-sm leading-7 text-gray-600 transition">
//           <span className="text-green-600 text-xl font-bold">
//             {doll.currency === "USD" ? "$" : "TRY"}
//             {doll.price}
//           </span>
//           {doll.price !== doll.originalPrice && (
//             <span className="ml-2 text-gray-500 line-through">
//               {doll.currency === "USD" ? "$" : "TRY"}
//               {doll.originalPrice}
//             </span>
//           )}
//         </p>

//         <Link
//           href={`/shop/${doll.id}`}
//           className="rounded-full border-[2px] border-light_text bg-brown py-2 text-center font-bold text-light_text transition-all duration-500 hover:border-brown hover:bg-light_text hover:text-brown"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };
