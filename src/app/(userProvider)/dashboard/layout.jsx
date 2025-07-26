"use client";
import { IconFileText, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-[#E4E4E7] bg-[#27272A] p-2 text-white">
        <img src="/assets/logo-og.png" />
        <ul className="mt-6 space-y-2">
          <li
            className={`rounded-md px-2 py-1 text-sm font-medium ${pathname === "/dashboard" ? "bg-white text-[#09090B]" : ""}`}
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <IconHome size={16} /> <span>Anasayfa</span>
            </Link>
          </li>
          <li
            className={`rounded-md px-2 py-1 text-sm font-medium ${pathname.startsWith("/dashboard/blog") ? "bg-white text-[#09090B]" : ""}`}
          >
            <Link href="/dashboard/blog" className="flex items-center gap-2">
              <IconFileText size={16} /> <span>Blog</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 bg-white p-6">{children}</main>
    </div>
  );
}
