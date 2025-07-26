"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { AlertDelete } from "@/components/AlertDelete";
import { Button } from "@/components/ui/button";

export default function BlogListesi() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blog")
        .select("id, title, slug, created_at, cover_image")
        .order("created_at", { ascending: false });

      if (error) {
        alert("Veri alınamadı: " + error.message);
      } else {
        setBlogs(data);
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("blog").delete().eq("id", id);
    if (error) {
      alert("Silme hatası: " + error.message);
    } else {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semivold text-2xl">Tüm Blog Yazıları</h1>
        <button
          onClick={() => router.push("/dashboard/blog/yeni")}
          className="bg-blue hover:bg-darkBlue flex items-center gap-2 whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium text-white transition-all duration-500"
        >
          <span> Yeni Post Ekle</span> <IconPlus size={16} />
        </button>
      </div>

      {loading ? (
        <div className="border-secondary-500 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="flex items-center justify-between gap-4 rounded border p-4"
            >
              <img src={blog.cover_image} className="h-10 w-10 rounded-sm" />
              <div>
                <h2 className="font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500">/{blog.slug}</p>
              </div>
              <Button
                className="ml-auto h-8 w-8 cursor-pointer border border-primary-main bg-white text-primary-main hover:bg-inherit"
                onClick={() =>
                  router.push(`/dashboard/blog/${blog.id}/duzenle`)
                }
              >
                <IconPencil />
              </Button>
              <div className="flex gap-2">
                <AlertDelete
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  handleDelete={() => handleDelete(blog.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
