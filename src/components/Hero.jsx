import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <section className="relative w-full h-[92dvh]">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 lg:to-transparent z-10"></div>

      <img
        src="/assets/hero-image.webp"
        alt="Hero"
        className="object-cover w-full h-full"
      />

      <div className="absolute mx-2 bg-black/40 rounded-2xl flex flex-col z-20 p-10 top-1/2 md:w-1/2 xl:w-1/3 2xl:w-1/4 font-medium md:mx-4 -translate-y-1/2  text-rose-50">
        <h1 className="text-5xl lg:text-6xl xl:text-7xl mb-4 text-center lg:text-start leading-10">
          Crafted with Love, Made from Nature
        </h1>
        <p className="text-xl italic text-center lg:text-start lg:text-2xl">
          Soft, safe, and sustainably handmade for your child’s endless
          imagination.
        </p>
        <button className="py-2 px-4 text-xl mt-4 self-center bg-rose-300 text-stone-800 font-semibold rounded-2xl hover:bg-rose-400 transition-all duration-500">
          <Link href="/shop">Go to Shop</Link>
        </button>
      </div>
    </section>
  );
};
