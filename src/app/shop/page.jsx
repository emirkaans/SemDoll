import { ShopListing } from "@/components/ShopListing";
import data from "@/data/data.json";

export const metadata = {
  title: "Shop - Waldorf Dolls",
  description: "Explore our collection of handmade Waldorf-inspired dolls.",
};

export default function Page() {
  return <ShopListing />;
}
