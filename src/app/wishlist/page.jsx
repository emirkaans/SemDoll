import { WishlistListing } from "@/components/WishlistListing";
import { getProducts } from "@/app/utils/utils";

export const metadata = {
  title: "My Wishlist",
  description: "Explore the collection of handmade dolls",
};

export default async function Page() {
  const products = await getProducts();

  return <WishlistListing products={products} />;
}
