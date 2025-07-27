"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
// import { AlertDelete } from "@/components/AlertDelete";
// import { Button } from "@/components/ui/button";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("doll")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("Veri alınamadı: " + error.message);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("doll").delete().eq("id", id);
    if (error) {
      alert("Silme hatası: " + error.message);
    } else {
      setProducts((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semivold text-2xl">Tüm Ürünler</h1>
        <button
          onClick={() => router.push("/dashboard/blog/yeni")}
          className="bg-blue hover:bg-darkBlue flex items-center gap-2 whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium text-white transition-all duration-500"
        >
          <span> Yeni Ürün Ekle</span> <IconPlus size={16} />
        </button>
      </div>

      {loading ? (
        <div className="border-secondary-500 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-4 rounded border p-4"
            >
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">/{product.url}</p>
              </div>

              <a href={`/dashboard/urun/${product.id}/duzenle`}>
                <IconPencil />
                <button>Düzenle</button>
              </a>

              <div className="flex gap-2">
                {/* <AlertDelete
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  handleDelete={() => handleDelete(product.id)}
                /> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
