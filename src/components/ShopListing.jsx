"use client";

import React from "react";
import data from "@/data/grandData.json";
import { ShopListItemCard } from "./ShopListItemCard";
import { Gloria_Hallelujah } from "@next/font/google";
import { motion } from "framer-motion";
import {
  framerContainerVariants,
  framerItemVariants,
} from "@/constants/constants";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

export const ShopListing = () => {
  return (
    <motion.div
      className="pb-8 pt-2 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className={`${gloria.className} my-6 text-4xl text-rose-800`}>
        My Shop
      </h1>
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={framerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((doll) => (
            <motion.div key={doll.id} variants={framerItemVariants}>
              <ShopListItemCard doll={doll} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
