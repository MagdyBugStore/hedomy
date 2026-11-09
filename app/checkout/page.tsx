"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/components/Providers";
import { money } from "@/lib/format";

const FIELDS = [
  { id: "name", label: "الاسم بالكامل", auto: "name" },
  { id: "phone", label: "رقم الموبايل", auto: "tel", dir: "ltr", mode: "tel" },
  { id: "city", label: "المحافظة / المدينة", auto: "address-level2" },
  { id: "address", label: "العنوان بالتفصيل", auto: "street-address" },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shipping, total, clearCart } = useStore();
  const [v, setV] = useState<Record<string, string>>({ name: "", phone: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");

  if (cart.length === 0) {
    return <div className="py-24 text-center text-muted"><p>السلة فاضية.</p><Link href="/shop" className="btn mt-6">تصفح المتجر</Link></div>;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setFail(""); setErrors({});
    try {
      const r = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart.map((l) => ({ id: l.id, size: l.size, qty: l.qty })), customer: v }),
      });
      const d = await r.json();
      if (!r.ok) {
        setErrors(d.errors || {});
        if (d.errors?.items) setFail(d.errors.items);
        else if (!d.errors) setFail("حصلت مشكلة، حاول مرة أخرى.");
        setBusy(false);
        return;
      }
      try { sessionStorage.setItem("hdoumi_last_order", JSON.stringify({ number: d.number, total: d.total, wa: d.waUrl, redirected: false })); } catch { /* ignore */ }
      clearCart();
      router.push(`/order/${d.number}`);
    } catch {
      setFail("تعذّر الاتصال بالخادم، حاول مرة أخرى.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:px-8">
      <h1 className="mb-8 text-2xl font-semibold">إتمام الطلب</h1>
      <form onSubmit={submit} noValidate className="grid gap-10 md:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="mb-1 block text-sm">{f.label}</label>
              <input id={f.id} className="field" autoComplete={f.auto} dir={"dir" in f ? f.dir : undefined} inputMode={"mode" in f ? f.mode : undefined}
                value={v[f.id]} onChange={(e) => setV({ ...v, [f.id]: e.target.value })} aria-invalid={!!errors[f.id]} aria-describedby={errors[f.id] ? f.id + "-e" : undefined} />
              {errors[f.id] && <p id={f.id + "-e"} className="mt-1 text-sm text-red-700">{errors[f.id]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="notes" className="mb-1 block text-sm">ملاحظات (اختياري)</label>
            <textarea id="notes" className="field" rows={3} value={v.notes} onChange={(e) => setV({ ...v, notes: e.target.value })} />
          </div>
          <p className="text-sm text-muted">الدفع عند الاستلام. بعد تأكيد الطلب هنحوّلك على واتساب لإرسال تفاصيله وتأكيده معنا.</p>
          {fail && <p role="alert" className="text-sm text-red-700">{fail}</p>}
        </div>
        <aside className="h-fit bg-surface p-6">
          <h2 className="mb-4 font-semibold">طلبك</h2>
          <ul className="mb-4 space-y-2 text-sm">
            {cart.map((l) => (<li key={l.id + l.size} className="flex justify-between gap-3"><span>{l.title} <span className="text-muted">({l.size}) × {l.qty}</span></span><span>{money(l.price * l.qty)}</span></li>))}
          </ul>
          <dl className="space-y-2 border-t border-line pt-3 text-sm">
            <div className="flex justify-between"><dt>المجموع</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>الشحن</dt><dd>{shipping ? money(shipping) : "مجاني"}</dd></div>
            <div className="flex justify-between text-base font-semibold"><dt>الإجمالي</dt><dd>{money(total)}</dd></div>
          </dl>
          <button className="btn mt-5 w-full" disabled={busy}>{busy ? "جاري إرسال الطلب…" : "تأكيد الطلب عبر واتساب"}</button>
        </aside>
      </form>
    </div>
  );
}
