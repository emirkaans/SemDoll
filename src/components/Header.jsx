"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Gloria_Hallelujah } from "@next/font/google";
import { navigationMenu } from "@/constants/constants";
import { IconMenu2, IconX } from "@tabler/icons-react";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  return (
    <header className="bg-light_pink/5 shadow-md">
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <div className="text-4xl font-bold text-primary-main">
          <Link className={gloria.className} href="/">
            SemDoll
          </Link>
        </div>

        <button onClick={handleOpenMenu} className="lg:hidden">
          <IconMenu2 />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-y-8 bg-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4"
            >
              <IconX size={32} className="text-black" />
            </button>
            {navigationMenu.map((item, key) => (
              <Link
                onClick={() => setTimeout(() => setIsOpen(false), 300)}
                href={item.href}
                key={key}
                className="text-2xl uppercase transition duration-500 hover:text-rose-600"
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}

        {/* Navigation */}
        <nav className="hidden space-x-6 font-medium text-gray-700 lg:flex">
          {navigationMenu.map((item, key) => (
            <Link
              href={item.href}
              key={key}
              className="text-xl transition duration-500 hover:text-rose-600"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
