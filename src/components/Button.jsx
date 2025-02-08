import Link from "next/link";
import React, { useEffect, useState } from "react";

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

export const Button = ({ href, text, isBlank }) => {
  const [color, setColor] = useState({ bg: "", hover: "" });

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <Link
      href={href}
      className={`rounded-full border-[2px] border-gray-300 ${color.bg} w-full py-2 text-center font-bold text-stone-800 transition-all duration-300 ${color.hover}`}
      target={isBlank ? "_blank" : ""}
    >
      {text}
    </Link>
  );
};
