import { ProductDetailCard } from "@/components/ProductDetailCard";
import { redirect } from "next/navigation";
import { getProductById } from "@/app/utils/utils";

export const metadata = {
  title: "SemDoll",
  description: "Explore the collection of handmade dolls",
};

export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!id) redirect("/");

  return <ProductDetailCard product={product} />;
}
