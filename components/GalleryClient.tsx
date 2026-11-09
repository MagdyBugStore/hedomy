"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import { imgSrc, money } from "@/lib/format";
import { useStore } from "./Providers";
import { HeartIcon } from "./Icons";
import FadeImg from "./FadeImg";
import { CAT_LABEL } from "@/lib/config";

type Taste = { likes: number; kinds: string[]; brands: string[]; cats: string[] };

// Pinterest-like varied heights, fixed per product so the layout never jumps while images load.
const RATIOS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]"];
const ratioFor = (id: string) => { let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return RATIOS[h % RATIOS.length]; };

function SkeletonTile({ i }: { i: number }) {
  return <div className={`skeleton mb-3 break-inside-avoid md:mb-4 ${RATIOS[(i * 7 + 2) % RATIOS.length]}`} aria-hidden />;
}

function Tile({ p, onOpen }: { p: ProductDTO; onOpen: (p: ProductDTO) => void }) {
  const { favs, toggleFav } = useStore();
  const liked = favs.includes(p.id);
  return (
    <figure className="group relative mb-3 break-inside-avoid overflow-hidden bg-tile md:mb-4">
      <a href={`/product/${encodeURIComponent(p.id)}`} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); onOpen(p); }} className="block">
        <div className={`relative w-full ${ratioFor(p.id)}`}><FadeImg src={imgSrc(p.images[0], 500)} alt={p.title} /></div>
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-white opacity-0 transition-opacity group-hover:opacity-100 max-md:opacity-100">
          <div className="text-[11px] opacity-80">{p.brand}</div>
          <div className="line-clamp-1 text-sm">{p.title}</div>
          <div className="text-sm font-semibold">{money(p.price)}</div>
        </figcaption>
      </a>
      <button type="button" onClick={() => toggleFav(p.id, "gallery")} aria-pressed={liked} aria-label={liked ? "إلغاء الإعجاب" : "أعجبني"}
        className={`absolute left-2 top-2 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${liked ? "bg-ink text-white" : "bg-white/85 text-ink hover:bg-white"}`}>
        <HeartIcon filled={liked} size={20} />
      </button>
    </figure>
  );
}


/** Pinterest-style closeup: the picked product on top, then an endless feed of similar ones. Picking another one swaps the top. */
function PinView({ stack, onOpen, onBack, onClose }: { stack: ProductDTO[]; onOpen: (p: ProductDTO) => void; onBack: () => void; onClose: () => void }) {
  const p = stack[stack.length - 1];
  const { favs, toggleFav } = useStore();
  const [items, setItems] = useState<ProductDTO[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const page = useRef(1), busy = useRef(false), gen = useRef(0);
  const sentinel = useRef<HTMLDivElement>(null), box = useRef<HTMLDivElement>(null);
  const liked = favs.includes(p.id);

  const load = useCallback(async () => {
    if (busy.current) return;
    busy.current = true; setLoading(true);
    const g = gen.current;
    try {
      const r = await fetch(`/api/products/${encodeURIComponent(p.id)}/related?page=${page.current}`);
      const d = await r.json();
      if (g !== gen.current) return;
      setItems((prev) => { const seen = new Set(prev.map((x) => x.id)); return [...prev, ...d.items.filter((x: ProductDTO) => !seen.has(x.id) && x.id !== p.id)]; });
      setHasMore(!!d.hasMore); page.current += 1;
    } catch { setHasMore(false); } finally { busy.current = false; setLoading(false); }
  }, [p.id]);

  useEffect(() => { // new pin: reset the feed and jump to the top
    gen.current += 1; busy.current = false; page.current = 1; setItems([]); setHasMore(true);
    box.current?.scrollTo({ top: 0 });
    load();
  }, [load]);
  useEffect(() => {
    const el = sentinel.current, root = box.current;
    if (!el || !root) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting && hasMore && !busy.current) load(); }, { root, rootMargin: "1200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, load, items.length]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-bg" role="dialog" aria-label={p.title}>
      <div ref={box} className="h-full overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-bg/95 px-3 backdrop-blur md:px-8">
          <button onClick={onBack} className="flex h-10 items-center gap-1 px-2 text-sm" aria-label="رجوع">→ {stack.length > 1 ? "رجوع" : "المعرض"}</button>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center text-xl" aria-label="إغلاق">✕</button>
        </div>
        <div className="mx-auto grid max-w-[1100px] gap-6 px-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-8">
          <div className="relative bg-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc(p.images[0], 1000)} alt={p.title} referrerPolicy="no-referrer" className="max-h-[80vh] w-full object-contain" />
          </div>
          <div className="min-w-0 self-center">
            <div className="text-sm text-muted">{p.brand}</div>
            <h2 className="mt-1 text-xl font-semibold leading-snug">{p.title}</h2>
            <div className="mt-2 text-lg">{p.price != null ? money(p.price) : "اسأل عن السعر"}</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/product/${encodeURIComponent(p.id)}`} className="bg-ink px-6 py-3 text-sm text-white">عرض المنتج والتفاصيل</Link>
              <button type="button" onClick={() => toggleFav(p.id, "gallery")} aria-pressed={liked} className={`flex items-center gap-2 border border-line px-4 py-3 text-sm ${liked ? "bg-ink text-white" : ""}`}><HeartIcon filled={liked} size={18} />{liked ? "في المفضلة" : "أعجبني"}</button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1700px] px-3 pb-10 md:px-8">
          <h3 className="mb-4 text-base font-semibold">منتجات شبيهة</h3>
          <div className="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-5">
            {items.map((x) => <Tile key={x.id} p={x} onOpen={onOpen} />)}
            {loading && Array.from({ length: items.length ? 5 : 10 }, (_, i) => <SkeletonTile key={"s" + i} i={i} />)}
          </div>
          <div ref={sentinel} className="py-10 text-center text-sm text-muted">{!loading && !hasMore ? (items.length ? "وصلت للنهاية" : "") : ""}</div>
        </div>
      </div>
    </div>
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
  const [stack, setStack] = useState<ProductDTO[]>([]);
  const depth = useRef(0);
  const open = useCallback((p: ProductDTO) => { history.pushState({ pin: true }, ""); depth.current += 1; setStack((s) => [...s, p]); }, []);
  const back = useCallback(() => { if (depth.current > 0) history.back(); }, []);
  const closeAll = useCallback(() => { if (depth.current > 0) history.go(-depth.current); }, []);
  useEffect(() => {
    const pop = () => { if (depth.current > 0) { depth.current -= 1; setStack((s) => s.slice(0, -1)); } };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);

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
        {items.map((p) => <Tile key={p.id} p={p} onOpen={open} />)}
        {loading && Array.from({ length: items.length ? 5 : 10 }, (_, i) => <SkeletonTile key={"s" + i} i={i} />)}
      </div>
      <div ref={sentinel} className="py-10 text-center text-sm text-muted">{loading ? "جاري التحميل…" : !hasMore ? "وصلت للنهاية" : ""}</div>
      {stack.length > 0 && <PinView stack={stack} onOpen={open} onBack={back} onClose={closeAll} />}
    </div>
  );
}
