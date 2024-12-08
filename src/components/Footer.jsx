import React from "react";
import { Gloria_Hallelujah } from "@next/font/google";
import Link from "next/link";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const Footer = () => {
  return (
    <footer className="bg-pink-100 py-8">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="text-4xl font-bold text-primary-main">
          <Link className={gloria.className} href="/">
            SemDoll
            {/* <img className="w-32" src="/assets/logo.jpg" alt="" /> */}
          </Link>
        </div>

        {/* Links */}
        <div className="flex justify-center space-x-6 text-gray-700 font-medium mb-4">
          <a href="/about" className="hover:text-pink-600">
            About Us
          </a>
          <a href="/shop" className="hover:text-pink-600">
            Shop
          </a>
          <a href="/contact" className="hover:text-pink-600">
            Contact
          </a>
          <a href="/privacy" className="hover:text-pink-600">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-pink-600 hover:text-pink-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 2.25h-13.5A3 3 0 002.25 5.25v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3zm-2.25 10.5h-1.5v6h-3v-6H9.75V9.75h2.25V8.25c0-1.242.258-2.25 1.5-2.25h1.5v3h-1.5v1.5h1.5l-.375 3z"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-pink-600 hover:text-pink-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 2.25h9a5.25 5.25 0 015.25 5.25v9a5.25 5.25 0 01-5.25 5.25h-9A5.25 5.25 0 012.25 16.5v-9A5.25 5.25 0 017.5 2.25zm3.75 6A3 3 0 108.25 12a3 3 0 003-3zm6 0a.75.75 0 01-.75-.75.75.75 0 011.5 0 .75.75 0 01-.75.75zm.75 9a5.25 5.25 0 01-10.5 0 5.25 5.25 0 0110.5 0z"
              />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} SemDoll. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
