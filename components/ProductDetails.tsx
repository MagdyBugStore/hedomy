import type { ProductDTO } from "@/lib/types";
import Stars from "./Stars";

const n = (x: number) => x.toLocaleString("en-US");

export function StatsBar({ p }: { p: ProductDTO }) {
  const s = p.stats;
  const items = [
    s.likes > 0 && { k: "likes", t: `${n(s.likes)} أعجبهم` },
    s.views > 0 && { k: "views", t: `${n(s.views)} مشاهدة` },
    s.opens > 0 && { k: "opens", t: `${n(s.opens)} فتحوا صفحة المنتج` },
  ].filter(Boolean) as { k: string; t: string }[];
  if (!s.reviews && !items.length) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      {s.reviews > 0 && (
        <a href="#reviews" className="flex items-center gap-1.5 hover:text-ink"><Stars value={s.rating} /><span>{s.rating} ({n(s.reviews)} تقييم)</span></a>
      )}
      {items.map((i) => <span key={i.k}>{i.t}</span>)}
    </div>
  );
}

export function Swatches({ p }: { p: ProductDTO }) {
  if (!p.colors.length) return null;
  return (
    <div className="mt-6">
      <div className="mb-2 text-sm text-muted">الألوان المتاحة: <span className="text-ink">{p.colors.map((c) => c.name).join("، ")}</span></div>
      <div className="flex flex-wrap gap-2.5">
        {p.colors.map((c) => (
          <span key={c.key + c.name} title={c.name} className="h-8 w-8 rounded-full border border-line p-0.5">
            <span className="block h-full w-full rounded-full border border-black/10" style={{ background: c.hex || "conic-gradient(#e33,#ee3,#3c3,#3ce,#33e,#c3c,#e33)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Spec rows: structured attributes + rows parsed from the brand's description + admin-added rows (de-duplicated by label). */
export function Specs({ p }: { p: ProductDTO }) {
  const rows: { label: string; value: string }[] = [];
  const add = (label: string, value: string) => { if (value && !rows.some((r) => r.label === label)) rows.push({ label, value }); };
  add("الخامة", p.composition || p.materials.join("، "));
  if (p.composition && p.materials.length) add("نوع القماش", p.materials.join("، "));
  add("القصّة", p.fit);
  add("النقشة", p.pattern);
  for (const r of [...p.details, ...p.specs]) add(r.label, r.value);
  if (p.fabricNote && !rows.some((r) => r.value === p.fabricNote)) add("ملاحظة الخامة", p.fabricNote);
  if (p.care.length) add("العناية", p.care.join(" · "));
  if (!rows.length) return null;
  return (
    <section className="mt-8 border-t border-line pt-6" aria-labelledby="specs">
      <h2 id="specs" className="mb-3 text-lg font-semibold">التفاصيل</h2>
      <dl className="divide-y divide-line text-sm">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-4 py-2.5"><dt className="text-muted">{r.label}</dt><dd className="leading-7">{r.value}</dd></div>
        ))}
      </dl>
    </section>
  );
}

export function SizeGuide({ p }: { p: ProductDTO }) {
  if (!p.sizeChart && !p.sizeChartImage) return null;
  return (
    <details className="mt-6 border-y border-line py-4" open={!!p.sizeChart}>
      <summary className="cursor-pointer text-lg font-semibold">جدول المقاسات</summary>
      {p.sizeChart && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-center text-sm" dir="ltr">
            <thead><tr>{p.sizeChart.headers.map((h) => <th key={h} className="border border-line bg-tile px-3 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody>{p.sizeChart.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`border border-line px-3 py-2 ${j === 0 ? "font-medium" : ""}`}>{c}</td>)}</tr>)}</tbody>
          </table>
          <p className="mt-2 text-xs text-muted">القياسات بالـ{p.sizeChart.unit} وقد تختلف قليلاً.</p>
        </div>
      )}
      {!p.sizeChart && p.sizeChartImage && (
        <a href={p.sizeChartImage} target="_blank" rel="noopener noreferrer" className="mt-4 block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.sizeChartImage} alt={`جدول مقاسات ${p.title}`} loading="lazy" referrerPolicy="no-referrer" className="mx-auto max-h-[560px] w-auto max-w-full bg-white" />
          <span className="mt-2 block text-center text-xs text-muted">اضغط لتكبير الصورة</span>
        </a>
      )}
    </details>
  );
}
