"use client";
import { productPath } from "@/lib/site";
import { useState } from "react";
import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import { useStore } from "./Providers";
import { HeartIcon } from "./Icons";

export default function BuyBox({ p }: { p: ProductDTO }) {
  const { addToCart, favs, toggleFav, notify } = useStore();
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [added, setAdded] = useState(false);
  const fav = favs.includes(p.id);
  const brand = p.origin === "brand";
  const shown = p.allSizes.length ? p.allSizes : p.sizes; // every size the piece comes in; the ones not in stock are struck through

  const wa = p.contact?.wa;
  const count = () => { fetch(`/api/products/${encodeURIComponent(p.id)}/contact`, { method: "POST", keepalive: true }).catch(() => {}); };
  // ready-made inquiry that opens the MERCHANT's chat (never ours); we only count the tap
  const askMerchant = () => {
    const text = [
      "السلام عليكم 👋",
      "أنا جاي من خلال موقع هدومي وعايز أستفسر عن المنتج ده:",
      "",
      `• المنتج: ${p.title}`,
      `• التاجر: ${p.brand}`,
      size && size !== "مقاس موحد" ? `• المقاس: ${size}` : "",
      p.price != null ? `• السعر على الموقع: ${Math.round(p.price)} ج.م` : "",
      `• الرابط: ${window.location.origin}${productPath(p)}`,
      "",
      "هل المنتج متاح؟ وممكن تفاصيل أكتر (الألوان / المقاسات / الشحن)؟ شكراً",
    ].filter((l, i, a) => l !== "" || (a[i - 1] !== "" && i > 0)).join("\n");
    count();
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const add = () => {
    if (!size && p.sizes.length) { notify("اختر المقاس أولاً"); return; }
    addToCart({ id: p.id, size: size || "مقاس موحد", title: p.title, brand: p.brand, price: p.price || 0, image: p.images[0] || "" });
    setAdded(true);
  };

  return (
    <div className="mt-6">
      {shown.length > 0 && !(shown.length === 1 && shown[0] === "مقاس موحد") && (
        <div>
          <div className="mb-2 text-sm text-muted">المقاس{brand ? " (حسب توفر البراند)" : ""}</div>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="المقاس">
            {shown.map((s) => {
              const out = !p.sizes.includes(s);
              return (
                <button key={s} role="radio" aria-checked={size === s} aria-disabled={out} disabled={out} title={out ? "غير متوفر" : undefined} onClick={() => setSize(s)} dir="ltr"
                  className={`min-w-12 border px-3 py-2 text-sm ${out ? "cursor-not-allowed border-line text-muted/50 line-through" : size === s ? "border-ink bg-ink text-white" : "border-line bg-surface hover:border-ink"}`}>{s}</button>
              );
            })}
          </div>
        </div>
      )}
      <div className="mt-6 flex gap-2">
        {brand ? (
          <a href={p.url} onClick={() => { fetch(`/api/products/${encodeURIComponent(p.id)}/out`, { method: "POST", keepalive: true }).catch(() => {}); }} target="_blank" rel="noopener noreferrer" className="btn flex-1">اشترِ من موقع {p.brand} ↗</a>
        ) : p.price != null ? (
          <button className="btn flex-1" onClick={add}>أضف إلى السلة</button>
        ) : wa ? (
          <button className="btn flex-1" onClick={askMerchant}>استفسر عن المنتج على واتساب</button>
        ) : p.origin === "instagram" && p.url ? (
          <a href={p.url} onClick={count} target="_blank" rel="noopener noreferrer" className="btn flex-1">راسل التاجر على إنستجرام ↗</a>
        ) : null}
        <button onClick={() => toggleFav(p.id)} aria-pressed={fav} aria-label="المفضلة" className="btn btn-line !px-4"><HeartIcon filled={fav} /></button>
      </div>
      {!brand && p.price != null && wa && <button className="btn btn-line mt-2 w-full" onClick={askMerchant}>استفسر من التاجر على واتساب</button>}
      {p.origin === "instagram" && p.url && (wa || p.price != null) && <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-sm underline">شاهد البوست على إنستجرام ↗</a>}
      {added && <Link href="/cart" className="mt-3 block text-center text-sm underline">عرض السلة وإتمام الطلب</Link>}
      {brand && <p className="mt-3 text-xs text-muted">هذا المنتج يباع على موقع {p.brand} الرسمي، وسيتم تحويلك إلى صفحة المنتج هناك لإتمام الشراء.</p>}
    </div>
  );
}
