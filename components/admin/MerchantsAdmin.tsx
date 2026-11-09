"use client";
import { useEffect, useState } from "react";

type M = { brandKey: string; name: string; origin: string; products: number; whatsapp: string; source: string; clicks: number; clicks7: number; clicks30: number; lastClickAt: string | null };

export default function MerchantsAdmin() {
  const [items, setItems] = useState<M[] | null>(null);
  const [total, setTotal] = useState(0);
  const [edit, setEdit] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  const load = async () => {
    const r = await fetch("/api/admin/merchants", { cache: "no-store" });
    if (r.ok) { const d = await r.json(); setItems(d.items); setTotal(d.total); }
  };
  useEffect(() => { load(); }, []);

  const save = async (m: M) => {
    const v = edit[m.brandKey] ?? m.whatsapp;
    const r = await fetch("/api/admin/merchants", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ brandKey: m.brandKey, whatsapp: v }) });
    setMsg(r.ok ? `تم حفظ رقم ${m.name}` : "الرقم غير صحيح (مثال: 01012345678)");
    if (r.ok) { setEdit((e) => { const n = { ...e }; delete n[m.brandKey]; return n; }); load(); }
  };

  if (!items) return <p className="text-muted">جارٍ التحميل…</p>;
  return (
    <div>
      <p className="mb-4 text-sm text-muted">عدد مرات الضغط على زر واتساب التاجر (إجمالي: <strong className="text-ink">{total}</strong>). الضغط بيفتح واتساب التاجر مباشرة، ومفيش حاجة بتوصلك على رقمك.</p>
      {msg && <p className="mb-3 text-sm" role="status">{msg}</p>}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="border-b border-line text-right text-muted"><th className="py-2 font-normal">التاجر</th><th className="font-normal">منتجات</th><th className="font-normal">واتساب</th><th className="font-normal">7 أيام</th><th className="font-normal">30 يوم</th><th className="font-normal">الإجمالي</th><th className="font-normal">آخر ضغطة</th></tr></thead>
          <tbody>
            {items.map((m) => {
              const v = edit[m.brandKey] ?? m.whatsapp;
              return (
                <tr key={m.brandKey} className="border-b border-line">
                  <td className="py-2"><div>{m.name}</div><div className="text-xs text-muted">{m.origin === "instagram" ? "إنستجرام" : "تيليجرام"}</div></td>
                  <td>{m.products}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <input className="field !py-1 w-40" dir="ltr" inputMode="tel" placeholder="01012345678" value={v} onChange={(e) => setEdit({ ...edit, [m.brandKey]: e.target.value })} aria-label={`واتساب ${m.name}`} />
                      <button className="btn btn-line !px-3 !py-1" disabled={v === m.whatsapp} onClick={() => save(m)}>حفظ</button>
                    </div>
                    {m.whatsapp && m.source === "auto" && <div className="mt-1 text-xs text-amber-700">اتحدد تلقائي من الكابشنات، راجعه</div>}
                    {!m.whatsapp && <div className="mt-1 text-xs text-muted">من غير رقم: الزرار بيفتح البوست على إنستجرام</div>}
                  </td>
                  <td>{m.clicks7}</td><td>{m.clicks30}</td><td className="font-semibold">{m.clicks}</td>
                  <td className="text-xs text-muted">{m.lastClickAt ? new Date(m.lastClickAt).toLocaleString("ar-EG") : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
