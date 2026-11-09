"use client";
import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import { imgSrc, money } from "@/lib/format";
import { useStore } from "./Providers";
import { HeartIcon } from "./Icons";

export default function ProductCard({ p, priority = false }: { p: ProductDTO; priority?: boolean }) {
  const { favs, toggleFav } = useStore();
  const fav = favs.includes(p.id);
  return (
    <article className="group relative">
      <Link href={`/product/${encodeURIComponent(p.id)}`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[3/4] overflow-hidden bg-tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc(p.images[0], 600)} alt={p.title} loading={priority ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {p.images[1] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgSrc(p.images[1], 600)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"
              className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block" />
          )}
          {p.discount > 0 && <span className="absolute right-3 top-3 bg-ink px-2 py-1 text-xs text-white">خصم {p.discount}%</span>}
        </div>
      </Link>
      <div className="pt-3">
        <Link href={`/brand/${p.brandKey}`} className="relative z-10 inline-block py-1 text-xs text-muted underline-offset-4 hover:text-ink hover:underline">{p.brand}</Link>
        <Link href={`/product/${encodeURIComponent(p.id)}`} className="block">
          <h3 className="mt-0.5 line-clamp-2 min-h-[2.6em] text-[15px] leading-snug">{p.title}</h3>
          <div className="mt-1 flex items-baseline gap-2 text-sm">
            <span className="font-semibold">{money(p.price)}</span>
            {p.compareAt && <span className="text-xs text-muted line-through">{money(p.compareAt)}</span>}
          </div>
        </Link>
      </div>
      <button
        type="button" onClick={() => toggleFav(p.id)} aria-pressed={fav} aria-label={fav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        className="absolute left-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink backdrop-blur hover:bg-white"
      >
        <HeartIcon filled={fav} size={18} />
      </button>
    </article>
  );
}
