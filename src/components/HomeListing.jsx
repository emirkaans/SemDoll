import data from "@/data/grandData.json";
import { ShopListItemCard } from "./ShopListItemCard";

const HomeListing = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Waldorf Dolls
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.slice(0, 6).map((doll) => (
          <ShopListItemCard key={doll.id} doll={doll} />
        ))}
      </div>
    </div>
  );
};

export default HomeListing;
