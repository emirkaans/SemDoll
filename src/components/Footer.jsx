import React from "react";
import { Gloria_Hallelujah } from "@next/font/google";
import Link from "next/link";
import { navigationMenu } from "@/constants/constants";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const Footer = () => {
  return (
    <footer className="bg-pink-100 pt-4">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        {/* Logo */}
        <div className="text-4xl font-bold text-primary-main">
          <Link className={gloria.className} href="/">
            SemDoll
            {/* <img className="w-32" src="/assets/logo.jpg" alt="" /> */}
          </Link>
        </div>

        {/* Links */}
        <div className="mb-4 flex justify-center gap-x-6 font-medium text-gray-700">
          {navigationMenu.map((item, key) => (
            <Link
              href={item.href}
              key={key}
              className="text-xl transition duration-500 hover:text-rose-600"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <p className="w-full border-t border-gray-400 py-2 text-sm text-gray-700">
          © {new Date().getFullYear()} SemDoll. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
