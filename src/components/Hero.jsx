"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <motion.section
      className="relative h-[92dvh] w-full bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 z-10 bg-black/50 lg:to-transparent"></div>

      <img
        src="/assets/hero-test-2.png"
        alt="Hero"
        className="h-full w-full object-cover"
      />

      <div className="absolute top-1/2 z-20 mx-2 flex -translate-y-1/2 flex-col rounded-2xl bg-black/40 p-10 font-medium text-rose-50 md:mx-4 md:w-1/2 xl:w-1/3 2xl:w-1/4">
        <h1 className="mb-4 text-center text-5xl leading-10 lg:text-start lg:text-6xl xl:text-7xl">
          Crafted with Love, Made from Nature
        </h1>
        <p className="text-center text-xl italic lg:text-start lg:text-2xl">
          Soft, safe, and sustainably handmade for your child’s endless
          imagination.
        </p>
        <button className="mt-4 self-center rounded-2xl bg-rose-300 px-4 py-2 text-xl font-semibold text-stone-800 transition-all duration-500 hover:bg-rose-400">
          <Link href="/shop">Go to Shop</Link>
        </button>
      </div>
    </motion.section>
  );
};
