import Link from "next/link";
import React from "react";
import { Gloria_Hallelujah } from "@next/font/google";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  return (
    <header className="h-[8dvh] bg-light_pink/5 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-bold text-primary-main">
          <Link className={gloria.className} href="/">
            SemDoll
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link href="/about-us" className="hover:text-pink-600">
            About Us
          </Link>
          <Link href="/shop" className="hover:text-pink-600">
            Shop
          </Link>
          <Link href="/about-us" className="hover:text-pink-600">
            Wishlist
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Gallery
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
