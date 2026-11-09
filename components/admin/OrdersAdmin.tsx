"use client";
import { useCallback, useEffect, useState } from "react";
import { ORDER_STATUSES } from "@/lib/config";
import { money } from "@/lib/format";

type O = {
  number: string; status: string; total: number; subtotal: number; shipping: number; createdAt: string;
  customer: { name: string; phone: string; city: string; address: string; notes?: string };
  items: { title: string; brand: string; size: string; qty: number; price: number }[];
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<O[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/orders${status ? `?status=${status}` : ""}`);
    if (r.ok) setOrders((await r.json()).orders);
    setLoading(false);
  }, [status]);
  useEffect(() => { load(); }, [load]);

  const change = async (number: string, s: string) => {
    await fetch("/api/admin/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number, status: s }) });
    setOrders((o) => o.map((x) => (x.number === number ? { ...x, status: s } : x)));
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold">الطلبات {loading ? "" : `(${orders.length})`}</h1>
        <select className="pill" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="الحالة">
          <option value="">كل الحالات</option>
          {Object.entries(ORDER_STATUSES).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
        </select>
      </div>
      {!loading && orders.length === 0 && <p className="py-16 text-center text-muted">لا توجد طلبات.</p>}
      <div className="space-y-3">
        {orders.map((o) => (
          <details key={o.number} className="bg-surface">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 p-4">
              <span className="font-semibold"><bdi>{o.number}</bdi></span>
              <span>{o.customer.name}</span>
              <span className="text-sm text-muted">{new Date(o.createdAt).toLocaleString("ar-EG")}</span>
              <span>{money(o.total)}</span>
              <select className="pill !min-h-8 border border-line" value={o.status} onClick={(e) => e.stopPropagation()} onChange={(e) => change(o.number, e.target.value)}>
                {Object.entries(ORDER_STATUSES).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
            </summary>
            <div className="grid gap-6 border-t border-line p-4 text-sm md:grid-cols-2">
              <div className="space-y-1">
                <div>الهاتف: <a dir="ltr" className="underline" href={`https://wa.me/2${o.customer.phone.replace(/^\+?2/, "")}`}>{o.customer.phone}</a></div>
                <div>العنوان: {o.customer.address}، {o.customer.city}</div>
                {o.customer.notes && <div>ملاحظات: {o.customer.notes}</div>}
              </div>
              <ul className="space-y-1">
                {o.items.map((i, n) => (<li key={n}>{i.title} <span className="text-muted">({i.brand} · {i.size}) × {i.qty}</span> — {money(i.price * i.qty)}</li>))}
                <li className="border-t border-line pt-1">الشحن: {o.shipping ? money(o.shipping) : "مجاني"} · الإجمالي: <b>{money(o.total)}</b></li>
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
