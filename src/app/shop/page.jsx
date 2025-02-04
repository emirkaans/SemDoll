import { ShopListing } from "@/components/ShopListing";
import { getProducts } from "@/app/utils/utils";

export const metadata = {
  title: "Shop",
  description: "Explore the collection of handmade dolls",
};

export default async function Page() {
  const products = await getProducts();

  return <ShopListing products={products} />;
}
