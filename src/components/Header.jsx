import Link from "next/link";
import React from "react";
import { Gloria_Hallelujah } from "@next/font/google";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  return (
    <header className="bg-white shadow-md h-[8dvh]">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-4xl font-bold text-primary-main">
          <Link className={gloria.className} href="/">
            SemDoll
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <Link href="/about-us" className="hover:text-pink-600">
            About Us
          </Link>
          <Link href="/shop" className="hover:text-pink-600">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Contact
          </Link>
        </nav>

        {/* Cart Icon */}
        <div className="relative">
          <Link href="/cart" className="text-pink-600 hover:text-pink-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.879 8.879a2.25 2.25 0 002.25 2.121h7.764a2.25 2.25 0 002.25-2.121L21 3H3zm5.25 14.25a1.5 1.5 0 113 0m6.75 0a1.5 1.5 0 113 0"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
