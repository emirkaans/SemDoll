"use client";
import { Button } from "@/components/Button";
import React from "react";

const Custom404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
      <h1 className="mb-4 text-6xl font-bold text-rose-800">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Oops! Page Not Found.</h2>
      <p className="mb-6 text-center text-gray-600">
        The page you are looking for might have been removed, renamed, or is
        temporarily unavailable.
      </p>
      <Button href="/" text="Go back to Home Page" />
    </div>
  );
};

export default Custom404;
