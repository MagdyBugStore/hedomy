"use client";
import { useCallback, useEffect, useState } from "react";
import type { ProductDTO } from "@/lib/types";
import { imgSrc, money } from "@/lib/format";

type P = ProductDTO & { hidden: boolean; rawAvailable: boolean };

export default function ProductsAdmin() {
  const [items, setItems] = useState<P[]>([]);
  const [q, setQ] = useState("");
  const [origin, setOrigin] = useState("telegram");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, pages: 1, all: 0 });
  const [log, setLog] = useState("");

  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/products?q=${encodeURIComponent(q)}&origin=${origin}&page=${page}`);
    if (!r.ok) return;
    const d = await r.json();
    setItems(d.items); setMeta({ total: d.total, pages: d.pages, all: d.all });
  }, [q, origin, page]);
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    await fetch("/api/admin/products", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...body }) });
    load();
  };
  const refresh = async (mode: "import" | "full") => {
    if (mode === "full" && !confirm("هيسحب كل البراندات من مواقعها (ممكن ياخد وقت). متأكد؟")) return;
    await fetch("/api/admin/refresh", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode }) });
    const poll = async () => {
      const r = await (await fetch("/api/admin/refresh")).json();
      setLog(r.log);
      if (!/done\s*$/.test(r.log.trim())) setTimeout(poll, 3000); else load();
    };
    setTimeout(poll, 1500);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">المنتجات <span className="text-sm font-normal text-muted">({meta.all.toLocaleString("en-US")} إجمالاً)</span></h1>
        <div className="flex flex-wrap gap-2">
          <button className="pill" onClick={() => refresh("import")}>إعادة استيراد الكتالوج</button>
          <button className="pill" onClick={() => refresh("full")}>سحب البراندات وتحديثها</button>
        </div>
      </div>
      {log && <pre dir="ltr" className="mb-5 max-h-40 overflow-auto bg-surface p-3 text-xs">{log}</pre>}
      <div className="mb-4 flex gap-2">
        <input className="field !w-64" placeholder="بحث بالاسم / البراند / الكود" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        <select className="pill" value={origin} onChange={(e) => { setOrigin(e.target.value); setPage(1); }}>
          <option value="telegram">منتجات هدومي (تيليجرام)</option>
          <option value="brand">منتجات البراندات</option>
          <option value="instagram">منتجات إنستجرام</option>
          <option value="">الكل</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line text-start text-muted"><tr><th className="p-3 text-start">المنتج</th><th className="p-3 text-start">البراند</th><th className="p-3 text-start">السعر</th><th className="p-3 text-start">الحالة</th><th /></tr></thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="flex items-center gap-3 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc(p.images[0], 100)} alt="" className="h-14 w-11 bg-tile object-cover" referrerPolicy="no-referrer" />
                  <div><div>{p.title}</div><div className="text-xs text-muted" dir="ltr">{p.id}</div></div>
                </td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">
                  <input className="field !w-24 !py-1" defaultValue={p.price ?? ""} inputMode="numeric" aria-label="السعر"
                    onBlur={(e) => { const v = e.target.value.trim(); if (v !== String(p.price ?? "")) patch(p.id, { price: v }); }} />
                  <span className="ms-1 text-xs text-muted">{money(p.price)}</span>
                </td>
                <td className="p-3">{p.hidden ? "مخفي" : p.rawAvailable ? "ظاهر" : "غير متاح"}</td>
                <td className="p-3"><button className="pill !min-h-8 border border-line" onClick={() => patch(p.id, { hidden: !p.hidden })}>{p.hidden ? "إظهار" : "إخفاء"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-sm">
        <button className="pill" disabled={page <= 1} onClick={() => setPage(page - 1)}>السابق</button>
        <span>{page} / {meta.pages} · {meta.total.toLocaleString("en-US")} منتج</span>
        <button className="pill" disabled={page >= meta.pages} onClick={() => setPage(page + 1)}>التالي</button>
      </div>
    </div>
  );
}
