import ListItemCard from "./HomeListItemCard";

const data = {
  waldorfDolls: [
    {
      name: "16 inches Waldorf Doll",
      price: 200,
      description:
        "16'' inch handmade Waldorf inspired doll. With hand knitted outfits and teddy bear. Waldorf puppe. Christmas gift doll. Unique gift for her",
      images: [
        "https://i.etsystatic.com/25201772/r/il/b897df/6474749409/il_794xN.6474749409_f3t4.jpg",
      ],
      size: "16 inches",
      url: "https://www.etsy.com/listing/1811095586/16-inch-handmade-waldorf-inspired-doll",
      materials: "cotton, wool, fiber, fabric, love",
    },
    {
      name: "16 inches Waldorf Doll",
      price: 200,
      description:
        "16'' inch handmade Waldorf inspired doll. With hand knitted outfits and teddy bear. Waldorf puppe. Christmas gift doll. Unique gift for her",
      images: [
        "https://i.etsystatic.com/25201772/r/il/b897df/6474749409/il_794xN.6474749409_f3t4.jpg",
      ],
      size: "16 inches",
      url: "https://www.etsy.com/listing/1811095586/16-inch-handmade-waldorf-inspired-doll",
      materials: "cotton, wool, fiber, fabric, love",
    },
    {
      name: "16 inches Waldorf Doll",
      price: 200,
      description:
        "16'' inch handmade Waldorf inspired doll. With hand knitted outfits and teddy bear. Waldorf puppe. Christmas gift doll. Unique gift for her",
      images: [
        "https://i.etsystatic.com/25201772/r/il/b897df/6474749409/il_794xN.6474749409_f3t4.jpg",
      ],
      size: "16 inches",
      url: "https://www.etsy.com/listing/1811095586/16-inch-handmade-waldorf-inspired-doll",
      materials: "cotton, wool, fiber, fabric, love",
    },
  ],
};

const Listing = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Waldorf Dolls
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.waldorfDolls.map((doll, index) => (
          <ListItemCard key={index} doll={doll} />
        ))}
      </div>
    </div>
  );
};

export default Listing;
