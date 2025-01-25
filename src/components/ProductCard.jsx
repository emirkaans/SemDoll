"use client";

import React, { useState } from "react";
import data from "@/data/grandData.json";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./Button";

const descriptions = {
  waldorfDoll:
    "Waldorf-style dolls captivate everyone with their natural charm and warmth. They are made from 100% organic cotton and firmly stuffed with clean organic wool. Their soft mohair yarn hair allows you to create different hairstyles with ease. Every detail is lovingly handcrafted using eco-friendly materials. Their hand-embroidered eyes give each doll a unique personality. Cleaning is simple—just gently wipe with a damp cloth. Waldorf dolls are special companions that bring the beauty of nature and the warmth of love to you and your loved ones.",
  ragDoll:
    "This adorable rag doll is handcrafted with love and attention to detail. Her sweet face is painted using delicate brush techniques, giving her a unique and charming expression. Her detachable clothes make playtime even more fun, and her soft wool hair adds a cozy touch. While her body can be gently cleaned with a soapy cloth, her clothes can be washed with care in warm water. This doll is a timeless companion, perfect for bringing joy and warmth to both children and collectors.",
  customDoll:
    "Create your own personalized doll with custom features! Choose the hair and eye color, request extra clothes, or even send pictures of a special character you'd like. I’ll review your request and confirm its feasibility before starting. Once the doll is complete, I’ll share pictures for your approval before shipping. These handmade dolls are spot-clean only, while their clothes can be gently washed. A thoughtful, one-of-a-kind gift filled with love for you and your loved ones!",
  clothingSet:
    "This custom handmade clothing set is thoughtfully crafted with meticulous attention to detail. The pieces are easy to put on and take off, adding convenience and fun. They are also machine washable at 30 degrees, ensuring long-lasting use. A charming addition to your doll’s wardrobe!",
  gnome:
    "This handmade Scandinavian gnome set is perfect for adding charm to your home. Inspired by Nordic folklore, gnomes are believed to bring luck and protect your home. Made with fleece and cotton fabric, their plush beards and fiber filling make them perfect for decoration. Place them in your favorite corner or garden to spread positive energy. They also make a thoughtful gift for family and friends. Please note, these are not toys and are unsuitable for children under 4 years and pets.",
  blankDoll:
    "This blank Waldorf doll is perfect for those who want to create their own unique doll. The head is tightly shaped using the needle felting method, and the body is filled with natural sheep’s wool. You can design her face, choose any hair color, and sew custom clothes to make her truly yours. This is a heartfelt, handmade gift option for your loved ones. Spot cleaning is recommended to keep her in perfect condition.",
  feltedDollHead:
    "These Waldorf doll heads are carefully shaped using the needle felting technique, resulting in a firm and durable structure. Each head is crafted with meticulous detail and can be customized to fit the size of the doll you’re creating. Perfect for your handmade projects, these heads are the same ones I use for the dolls in my store. A great starting point for creating your own unique doll!",
};

export const ProductCard = () => {
  const { id } = useParams();
  const router = useRouter();
  const product = data.find((item) => item.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    router.push("/not-found");
    return null;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.img.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.img.length) % product.img.length,
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-10 bg-white px-20 py-10 shadow-xl md:grid-cols-5">
        {/* Left Section: Slider */}
        <div className="flex flex-col items-center justify-center md:col-span-3">
          <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
            {/* Slider Wrapper */}
            <div
              className="flex h-full w-full transition-transform duration-500"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {product.img.map((image, index) => (
                <div key={index} className="h-full w-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full p-3 text-lg"
              onClick={handlePreviousImage}
            >
              ❮
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full p-3 text-lg"
              onClick={handleNextImage}
            >
              ❯
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex justify-center space-x-2">
            {product.img.map((image, index) => (
              <button
                key={index}
                className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                  index === currentImageIndex
                    ? "border-rose-400"
                    : "border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col justify-between rounded-lg p-6 md:col-span-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <p className="text-2xl font-bold text-gray-600">
                ${product.price.toFixed(2)}
              </p>
              {product.price !== product.originalPrice && (
                <p className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {product.materials && (
            <p className="mt-6 text-sm text-gray-500">
              Materials: {product.materials}
            </p>
          )}
          {product.height && (
            <p className="mt-2 text-sm text-gray-500">
              Height: {product.height}
            </p>
          )}
          <p className="my-6 text-lg text-gray-700">
            {descriptions[product.type]}
          </p>

          <Button href={product.url} text="View on Etsy" isBlank={true} />
        </div>
      </div>
    </div>
  );
};
