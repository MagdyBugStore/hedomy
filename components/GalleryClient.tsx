"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import { imgSrc, money } from "@/lib/format";
import { useStore } from "./Providers";
import { HeartIcon } from "./Icons";
import { CAT_LABEL } from "@/lib/config";

type Taste = { likes: number; kinds: string[]; brands: string[]; cats: string[] };

function Tile({ p }: { p: ProductDTO }) {
  const { favs, toggleFav } = useStore();
  const liked = favs.includes(p.id);
  return (
    <figure className="group relative mb-3 break-inside-avoid overflow-hidden bg-tile md:mb-4">
      <Link href={`/product/${encodeURIComponent(p.id)}`} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc(p.images[0], 500)} alt={p.title} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="block w-full min-h-40 object-cover" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-white opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100">
          <div className="text-[11px] opacity-80">{p.brand}</div>
          <div className="line-clamp-1 text-sm">{p.title}</div>
          <div className="text-sm font-semibold">{money(p.price)}</div>
        </figcaption>
      </Link>
      <button type="button" onClick={() => toggleFav(p.id, "gallery")} aria-pressed={liked} aria-label={liked ? "إلغاء الإعجاب" : "أعجبني"}
        className={`absolute left-2 top-2 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${liked ? "bg-ink text-white" : "bg-white/85 text-ink hover:bg-white"}`}>
        <HeartIcon filled={liked} size={20} />
      </button>
    </figure>
  );
}

export default function GalleryClient() {
  const { user } = useStore();
  const [items, setItems] = useState<ProductDTO[]>([]);
  const [taste, setTaste] = useState<Taste | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const [seedVal] = useState(() => Math.random().toString(36).slice(2, 8));
  const seed = useRef(seedVal);
  const busy = useRef(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    if (busy.current) return;
    busy.current = true; setLoading(true);
    try {
      const r = await fetch(`/api/gallery?page=${page.current}&seed=${seed.current}`);
      if (r.status === 401) { location.href = "/login?next=/gallery"; return; }
      const d = await r.json();
      if (d.taste) setTaste(d.taste);
      setItems((prev) => { const seen = new Set(prev.map((x) => x.id)); return [...prev, ...d.items.filter((x: ProductDTO) => !seen.has(x.id))]; });
      setHasMore(d.hasMore);
      page.current += 1;
    } finally { busy.current = false; setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting && hasMore) load(); }, { rootMargin: "1200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, load]);

  return (
    <div className="mx-auto max-w-[1700px] px-3 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">معرض {user?.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-muted">
            {taste && taste.likes > 0
              ? <>مختارات على ذوقك: {[...taste.kinds.slice(0, 3), ...taste.cats.map((c) => CAT_LABEL[c]).filter(Boolean).slice(0, 1)].join("، ")} · بناءً على {taste.likes} إعجاب</>
              : "اضغط ♥ على أي صورة تعجبك، وهنرتّب لك المعرض على ذوقك."}
          </p>
        </div>
      </div>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-5">
        {items.map((p) => <Tile key={p.id} p={p} />)}
      </div>
      <div ref={sentinel} className="py-10 text-center text-sm text-muted">{loading ? "جاري التحميل…" : !hasMore ? "وصلت للنهاية" : ""}</div>
    </div>
  );
}
