"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/components/Providers";
import ProductCard from "@/components/ProductCard";
import type { ProductDTO } from "@/lib/types";

export default function FavoritesPage() {
  const { favs } = useStore();
  const [items, setItems] = useState<ProductDTO[] | null>(null);
  const key = favs.join(",");
  useEffect(() => {
    if (!key) { setItems([]); return; }
    fetch(`/api/products?ids=${encodeURIComponent(key)}`).then((r) => r.json()).then((d) => setItems(d.items)).catch(() => setItems([]));
  }, [key]);
  return (
    <div className="mx-auto max-w-[1480px] px-4 py-10 md:px-8">
      <h1 className="mb-8 text-2xl font-semibold">المفضلة</h1>
      {items && items.length === 0 ? (
        <div className="py-20 text-center text-muted"><p>لم تضف أي منتج للمفضلة بعد.</p><Link href="/shop" className="btn mt-6">تصفح المتجر</Link></div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {(items || []).filter((p) => favs.includes(p.id)).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
