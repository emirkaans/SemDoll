import { ShopListItemCard } from "./ShopListItemCard";
import { Gloria_Hallelujah } from "@next/font/google";
import { getRandomElements } from "@/helpers/helpers";
import { getProducts } from "@/app/utils/utils";

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const HomeListing = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center justify-center py-8 lg:block lg:min-w-[70%]">
      <h1 className="mb-8 text-center text-5xl font-bold text-rose-900">
        <div className={gloria.className}>Handcrafted Dreams</div>
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {getRandomElements(
          6,
          products.filter((product) => product.type !== "customDoll"),
        ).map((doll) => (
          <ShopListItemCard key={doll.id} doll={doll} />
        ))}
      </div>
    </div>
  );
};

export default HomeListing;
