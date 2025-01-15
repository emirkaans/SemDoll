import { Hero } from "@/components/Hero";
import Listing from "@/components/HomeListing";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Listing />
    </>
  );
}
