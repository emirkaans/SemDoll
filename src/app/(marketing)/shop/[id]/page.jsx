import { ProductDetailCard } from "@/components/ProductDetailCard";
import { redirect } from "next/navigation";
import data from "@/data/grandData.json";

export const metadata = {
  title: "SemDoll",
  description: "Explore the collection of handmade dolls",
};

export async function generateStaticParams() {
  const products = data.map((product) => {
    return { id: product.id };
  });

  return products;
}

export default async function Page({ params }) {
  const { id } = await params;

  if (data.filter((product) => product.id.toString() === id).length === 0) {
    redirect("/not-found");
  }

  return (
    <>
      <ProductDetailCard id={id} />
    </>
  );
}
