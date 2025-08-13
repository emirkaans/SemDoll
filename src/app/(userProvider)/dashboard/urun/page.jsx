"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  IconPencil,
  IconPlus,
  IconTrash,
  IconLink,
  IconCopy,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_desc"); // created_desc | created_asc | name_asc | name_desc
  const [page, setPage] = useState(1);
  const perPage = 10;

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setFetchError("");
      const { data, error } = await supabase
        .from("doll")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setFetchError(error.message || "Veri alınamadı");
      } else {
        setProducts(Array.isArray(data) ? data : []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Bu ürünü silmek istediğine emin misin?");
    if (!ok) return;
    // Optimistic update
    const prev = products;
    setProducts((p) => p.filter((b) => b.id !== id));

    const { error } = await supabase.from("doll").delete().eq("id", id);
    if (error) {
      alert("Silme hatası: " + error.message);
      setProducts(prev); // rollback
    }
  };

  const parseImages = (imagesString) => {
    if (!imagesString) return [];
    try {
      const arr = JSON.parse(imagesString);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products;

    if (q) {
      list = list.filter((p) => {
        const name = (p.name || "").toLowerCase();
        const url = (p.url || "").toLowerCase();
        return name.includes(q) || url.includes(q);
      });
    }

    switch (sortBy) {
      case "created_asc":
        list = [...list].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at),
        );
        break;
      case "name_asc":
        list = [...list].sort((a, b) =>
          (a.name || "").localeCompare(b.name || ""),
        );
        break;
      case "name_desc":
        list = [...list].sort((a, b) =>
          (b.name || "").localeCompare(a.name || ""),
        );
        break;
      case "created_desc":
      default:
        list = [...list].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        break;
    }

    return list;
  }, [products, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url || "");
      // Basit geri bildirim:
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { message: "URL kopyalandı" } }),
      );
    } catch {
      alert("Kopyalama başarısız.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Tüm Ürünler</h1>
          <p className="text-muted-foreground text-sm">
            Toplam ürün: <span className="font-medium">{products.length}</span>
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/urun/yeni")}
          className="bg-blue hover:bg-darkBlue flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          <IconPlus size={16} />
          <span>Yeni Ürün Ekle</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Ürün adı veya URL ara…"
            className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-muted-foreground text-sm">Sırala:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created_desc">En yeni</option>
            <option value="created_asc">En eski</option>
            <option value="name_asc">İsme göre (A→Z)</option>
            <option value="name_desc">İsme göre (Z→A)</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="animate-pulse rounded border p-4">
              <div className="mb-3 h-40 w-full rounded bg-gray-200" />
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
              <div className="mt-4 flex gap-2">
                <div className="h-8 w-20 rounded bg-gray-200" />
                <div className="h-8 w-20 rounded bg-gray-200" />
              </div>
            </li>
          ))}
        </ul>
      ) : fetchError ? (
        <div className="border-red-200 bg-red-50 text-red-700 rounded border p-4 text-sm">
          Veriler yüklenemedi: {fetchError}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground rounded border p-8 text-center text-sm">
          {search
            ? "Aramanızla eşleşen ürün bulunamadı."
            : "Henüz ürün eklenmemiş. Hemen sağ üstten yeni bir ürün ekleyin."}
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pageItems.map((product) => {
              const imagesArray = parseImages(product.images);
              const imgSrc =
                imagesArray?.[0] ||
                "https://placehold.co/600x400?text=No+Image";

              const created =
                product.created_at &&
                !Number.isNaN(new Date(product.created_at))
                  ? new Date(product.created_at)
                  : null;

              return (
                <li
                  key={product.id}
                  className="group flex min-h-[320px] flex-col justify-between rounded border p-4"
                >
                  <div className="relative mb-3 h-80">
                    {" "}
                    {/* 🔹 önce h-40 idi, h-80 yaptık */}
                    <img
                      src={imgSrc}
                      alt={product.name || "Ürün görseli"}
                      className="h-full w-full rounded bg-gray-50 object-contain"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/400x600?text=No+Image";
                      }}
                    />
                    {created && (
                      <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                        {created.toLocaleDateString("tr-TR")}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h2 className="line-clamp-1 text-base font-semibold">
                      {product.name || "İsimsiz Ürün"}
                    </h2>
                    <p className="line-clamp-1 text-xs text-gray-500">
                      {product.url || "—"}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {product.url && (
                      <>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                        >
                          <IconLink size={16} />
                          Ürüne Git
                        </a>
                        <button
                          onClick={() => copyUrl(product.url)}
                          className="inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                          title="URL'yi kopyala"
                        >
                          <IconCopy size={16} />
                          Kopyala
                        </button>
                      </>
                    )}

                    <Link
                      href={`/dashboard/urun/${product.id}/duzenle`}
                      className="ml-auto inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      <IconPencil size={16} />
                      Düzenle
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 text-xs font-medium"
                    >
                      <IconTrash size={16} />
                      Sil
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-muted-foreground text-xs">
              {filtered.length} kayıttan {(currentPage - 1) * perPage + 1}–
              {Math.min(currentPage * perPage, filtered.length)} arası
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Önceki
              </button>
              <span className="text-sm">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded border px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Sonraki
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
