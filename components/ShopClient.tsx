"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductDTO } from "@/lib/types";
import ProductCard from "./ProductCard";
import BrandLogo from "./BrandLogo";
import type { Logo } from "@/lib/types";
import { CloseIcon, FilterIcon } from "./Icons";
import { CAT_LABEL, SORTS } from "@/lib/config";
import { money } from "@/lib/format";

type Facets = {
  kinds: { key: string; count: number }[];
  brands: { key: string; name: string; count: number }[];
  sizes: { key: string; count: number }[];
  price: { min: number; max: number };
};
type Result = { items: ProductDTO[]; total: number; page: number; pages: number; facets: Facets | null };

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-line py-5"><legend className="mb-3 font-medium">{title}</legend>{children}</fieldset>
  );
}

const MULTI = ["kind", "brand", "size"] as const;

export default function ShopClient({ lockBrand, brandName: lockedName, logo }: { lockBrand?: string; brandName?: string; logo?: Logo } = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const qs = sp.toString();
  const [data, setData] = useState<Result | null>(null);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(sp.get("q") || "");
  const [min, setMin] = useState(sp.get("min") || "");
  const [max, setMax] = useState(sp.get("max") || "");
  const searchRef = useRef<HTMLInputElement>(null);
  const facetKey = useRef("");

  const cat = sp.get("cat") || "";
  const sort = sp.get("sort") || "mix";
  const page = Math.max(1, +(sp.get("page") || 1));
  const sel = useMemo(() => Object.fromEntries(MULTI.map((k) => [k, (sp.get(k) || "").split(",").filter(Boolean)])) as Record<(typeof MULTI)[number], string[]>, [sp]);

  const push = useCallback((patch: Record<string, string | null>, keepPage = false) => {
    const n = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) { if (v) n.set(k, v); else n.delete(k); }
    if (!keepPage) n.delete("page");
    n.delete("focus");
    router.push(`${pathname}${n.toString() ? "?" + n : ""}`, { scroll: false });
  }, [sp, router, pathname]);

  // fetch products (and facets when the base filters changed)
  useEffect(() => {
    const ctl = new AbortController();
    const p = new URLSearchParams(qs);
    p.delete("focus");
    if (lockBrand) p.set("only", lockBrand);
    const fk = ["cat", "q", "min", "max", "sale"].map((k) => p.get(k) || "").join("|");
    const wantFacets = fk !== facetKey.current;
    if (wantFacets) p.set("facets", "1");
    setLoading(true);
    fetch(`/api/products?${p}`, { signal: ctl.signal })
      .then((r) => r.json())
      .then((d: Result) => {
        if (wantFacets) { facetKey.current = fk; setFacets(d.facets); }
        setData(d);
        setLoading(false);
      })
      .catch((e) => { if (e.name !== "AbortError") setLoading(false); });
    return () => ctl.abort();
  }, [qs, lockBrand]);

  useEffect(() => { if (sp.get("focus") === "search") searchRef.current?.focus(); }, [sp]);
  useEffect(() => { setQ(sp.get("q") || ""); setMin(sp.get("min") || ""); setMax(sp.get("max") || ""); }, [sp]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const toggle = (k: (typeof MULTI)[number], v: string) => {
    const cur = sel[k];
    push({ [k]: (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]).join(",") || null });
  };
  const activeCount = MULTI.reduce((s, k) => s + sel[k].length, 0) + (sp.get("min") || sp.get("max") ? 1 : 0);
  const brandName = (k: string) => facets?.brands.find((b) => b.key === k)?.name || k;
  const title = lockedName || (sp.get("q") ? `نتائج البحث` : sp.get("sale") ? "تخفيضات" : cat ? CAT_LABEL[cat] : "كل الملابس");
  
  const pages = data?.pages || 1;
  const pageList = useMemo(() => {
    const s = new Set([1, pages, page - 1, page, page + 1, page - 2, page + 2].filter((n) => n >= 1 && n <= pages));
    const arr = [...s].sort((a, b) => a - b);
    return arr.flatMap((n, i) => (i && n - arr[i - 1] > 1 ? [0, n] : [n]));
  }, [page, pages]);

  return (
    <div className="mx-auto max-w-[1480px] px-4 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 pt-7">
        <div className={lockBrand ? "flex items-center gap-4" : ""}>
          {lockBrand && <BrandLogo name={lockedName || ""} logo={logo} pad="p-2" className="h-14 w-24 shrink-0 border border-line" />}
          <div>
          <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
          {lockBrand && <p className="mt-1 text-sm text-muted">{data ? `${data.total.toLocaleString("en-US")} منتج` : ""}</p>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={(e) => { e.preventDefault(); push({ q: q.trim() || null }); }} role="search">
            <input ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن منتج أو براند" aria-label="بحث"
              className="h-10 w-44 rounded-full bg-surface px-4 text-sm outline-none focus:shadow-[inset_0_0_0_1px_var(--ink)] md:w-60" />
          </form>
          <span className="hidden text-sm text-muted md:inline">{data ? `${data.total.toLocaleString("en-US")} منتج` : ""}</span>
          <label className="sr-only" htmlFor="sort">ترتيب</label>
          <select id="sort" className="pill appearance-none pe-4" value={sort} onChange={(e) => push({ sort: e.target.value === "mix" ? null : e.target.value })}>
            {SORTS.map((s) => (<option key={s.key} value={s.key}>{s.label}</option>))}
          </select>
          <button type="button" className="pill" onClick={() => setOpen(true)}>
            <FilterIcon /> تصفية
            {activeCount > 0 && <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[11px] text-white">{activeCount}</span>}
          </button>
        </div>
      </div>

      {(activeCount > 0 || sp.get("q") || sp.get("sale")) && (
        <div className="mb-5 flex flex-wrap gap-2">
          {sp.get("q") && <button className="pill !min-h-8 text-xs" onClick={() => push({ q: null })}>«{sp.get("q")}» <CloseIcon /></button>}
          {sp.get("sale") && <button className="pill !min-h-8 text-xs" onClick={() => push({ sale: null })}>تخفيضات <CloseIcon /></button>}
          {MULTI.flatMap((k) => sel[k].map((v) => (
            <button key={k + v} className="pill !min-h-8 text-xs" onClick={() => toggle(k, v)}>{k === "brand" ? brandName(v) : v} <CloseIcon /></button>
          )))}
          {(sp.get("min") || sp.get("max")) && <button className="pill !min-h-8 text-xs" onClick={() => push({ min: null, max: null })}>{sp.get("min") || 0} – {sp.get("max") || "∞"} ج.م <CloseIcon /></button>}
        </div>
      )}

      <div className={`transition-opacity ${loading ? "opacity-50" : ""}`} aria-busy={loading}>
        {data && data.items.length === 0 ? (
          <div className="py-24 text-center text-muted">
            <p>لا توجد منتجات مطابقة.</p>
            <Link href="/shop" className="mt-4 inline-block underline">مسح كل الفلاتر</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {(data?.items || Array.from({ length: 8 }, () => null)).map((p, i) =>
              p ? <ProductCard key={p.id} p={p} priority={i < 4} /> : <div key={i} className="skeleton aspect-[3/4]" />
            )}
          </div>
        )}
      </div>

      {pages > 1 && (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-1" aria-label="الصفحات">
          <button className="pill" disabled={page <= 1} onClick={() => { push({ page: page > 2 ? String(page - 1) : null }, true); window.scrollTo({ top: 0 }); }}>السابق</button>
          {pageList.map((n, i) => n === 0 ? <span key={"g" + i} className="px-2 text-muted">…</span> : (
            <button key={n} aria-current={n === page ? "page" : undefined} onClick={() => { push({ page: n > 1 ? String(n) : null }, true); window.scrollTo({ top: 0 }); }}
              className={`grid h-10 min-w-10 place-items-center rounded-full px-2 text-sm ${n === page ? "bg-ink text-white" : "bg-surface hover:shadow-[inset_0_0_0_1px_var(--ink)]"}`}>{n}</button>
          ))}
          <button className="pill" disabled={page >= pages} onClick={() => { push({ page: String(page + 1) }, true); window.scrollTo({ top: 0 }); }}>التالي</button>
        </nav>
      )}

      {/* filter drawer */}
      <div className={`fixed inset-0 z-50 bg-black/35 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} aria-hidden />
      <aside role="dialog" aria-label="تصفية المنتجات" aria-hidden={!open}
        className={`fixed bottom-0 left-0 top-0 z-[60] flex w-[min(400px,92vw)] flex-col bg-surface transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full invisible"}`}>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-semibold">تصفية</h2>
          <button onClick={() => setOpen(false)} aria-label="إغلاق"><CloseIcon /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {facets && (
            <>
              <FilterGroup title="النوع">
                <div className="flex flex-wrap gap-2">
                  {facets.kinds.map((k) => (
                    <button key={k.key} aria-pressed={sel.kind.includes(k.key)} onClick={() => toggle("kind", k.key)}
                      className={`rounded-full border px-3 py-1.5 text-sm ${sel.kind.includes(k.key) ? "border-ink bg-ink text-white" : "border-line"}`}>{k.key} <span className="opacity-60">{k.count}</span></button>
                  ))}
                </div>
              </FilterGroup>
              {!lockBrand && <FilterGroup title="البراند">
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {facets.brands.map((b) => (
                    <label key={b.key} className="flex cursor-pointer items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2"><input type="checkbox" checked={sel.brand.includes(b.key)} onChange={() => toggle("brand", b.key)} className="h-4 w-4 accent-black" />{b.name}</span>
                      <span className="text-muted">{b.count}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>}
              <FilterGroup title="المقاس">
                <div className="flex flex-wrap gap-2">
                  {facets.sizes.map((s) => (
                    <button key={s.key} aria-pressed={sel.size.includes(s.key)} onClick={() => toggle("size", s.key)} dir="ltr"
                      className={`min-w-11 border px-3 py-1.5 text-sm ${sel.size.includes(s.key) ? "border-ink bg-ink text-white" : "border-line"}`}>{s.key}</button>
                  ))}
                </div>
              </FilterGroup>
              <FilterGroup title="السعر (ج.م)">
                <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); push({ min: min || null, max: max || null }); }}>
                  <input className="field" inputMode="numeric" placeholder={`من ${money(facets.price.min).replace(" ج.م", "")}`} value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} aria-label="أقل سعر" />
                  <span>–</span>
                  <input className="field" inputMode="numeric" placeholder={`إلى ${money(facets.price.max).replace(" ج.م", "")}`} value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} aria-label="أعلى سعر" />
                  <button className="btn !px-4">تطبيق</button>
                </form>
              </FilterGroup>
            </>
          )}
        </div>
        <div className="flex gap-2 border-t border-line p-4">
          <button className="btn flex-1" onClick={() => setOpen(false)}>عرض {data ? data.total.toLocaleString("en-US") : ""} منتج</button>
          {activeCount > 0 && <button className="btn btn-line" onClick={() => push({ kind: null, brand: null, size: null, min: null, max: null })}>مسح</button>}
        </div>
      </aside>
    </div>
  );
}
