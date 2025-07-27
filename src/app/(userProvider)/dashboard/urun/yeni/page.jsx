"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { IconPlus, IconTrash } from "@tabler/icons-react";

import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [language, setLanguage] = useState("tr");
  const [coverUrl, setCoverUrl] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCoverUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    const fileName = `cover-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(`public/${fileName}`, file, { upsert: true });

    if (error) {
      alert("Kapak görseli yüklenemedi: " + error.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(`public/${fileName}`);

    setCoverUrl(data.publicUrl);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!title || !slug || !coverUrl || !content) {
      alert("Tüm alanları doldurmalısın.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("blog").insert([
      {
        title,
        slug,
        cover_image: coverUrl,
        content: content,
        language,
      },
    ]);
    setLoading(false);

    if (error) {
      alert("Hata: " + error.message);
    } else {
      alert("Yazı başarıyla kaydedildi!");
      setTitle("");
      setSlug("");
      setCoverUrl("");
      setContent(null);
    }
  };

  function toSlug(str) {
    return str
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ı/g, "i")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <div className="space-y-6 bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Yeni Blog Yazısı Oluştur</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="h-9 w-full rounded border border-gray-200 p-2 text-sm font-semibold"
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>

      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => {
          const value = e.target.value;
          setTitle(value);
          setSlug(toSlug(value));
        }}
        className="h-9 w-full rounded border border-gray-200 p-2 text-sm font-semibold placeholder:text-gray-600"
      />

      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="h-9 w-full rounded border border-gray-200 p-2 text-sm font-semibold placeholder:text-gray-600"
      />

      <div
        className="relative overflow-hidden rounded-[12px]"
        style={{ width: "150px", height: "150px" }}
      >
        <label className="block h-full w-full">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file) {
                handleCoverUpload(file);
              }
            }}
            hidden
          />
          <div className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[16px] text-center">
            {coverUrl ? (
              <div className="group relative flex h-full w-full items-center gap-x-2 object-cover">
                <img
                  src={coverUrl}
                  className="h-full w-full rounded-[16px] border-2 object-cover"
                />
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 group-hover:flex">
                  <button
                    type="button"
                    onClick={() => {
                      setCoverUrl("");
                    }}
                    className="border-red-600 text-destructive text-red-600 flex h-[35px] w-[35px] items-center justify-center rounded-[8px] border bg-white"
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <span className="flex h-full w-full flex-col items-center justify-center rounded-[16px] border bg-gray-200 text-sm font-semibold text-[#01030A] transition-all duration-300">
                <IconPlus className="text-textGray" />
                <span className="mt-1 text-xs">Kapak Görseli Ekle</span>
              </span>
            )}
          </div>
        </label>
      </div>

      <CustomEditor
        customKey="blog-editor"
        content={content}
        setContent={setContent}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue flex h-8 min-w-32 items-center justify-center rounded text-sm text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <div className="border-secondary-500 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
        ) : (
          "Yazıyı Kaydet"
        )}
      </button>
    </div>
  );
}
