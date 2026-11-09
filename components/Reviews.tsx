"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReviewsDTO } from "@/lib/types";
import Stars from "./Stars";

const FIT_LABEL: Record<string, string> = { small: "المقاس أصغر من المعتاد", true: "المقاس مضبوط", large: "المقاس أكبر من المعتاد" };

export default function Reviews({ id, sizes }: { id: string; sizes: string[] }) {
  const router = useRouter();
  const [d, setD] = useState<ReviewsDTO | null>(null);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [size, setSize] = useState("");
  const [fit, setFit] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    const r = await fetch(`/api/products/${encodeURIComponent(id)}/reviews`, { cache: "no-store" });
    if (r.ok) setD(await r.json());
  }, [id]);
  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { setErr("اختر عدد النجوم"); return; }
    setBusy(true); setErr("");
    const r = await fetch(`/api/products/${encodeURIComponent(id)}/reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating, text, size, fit }) });
    setBusy(false);
    if (!r.ok) { setErr("تعذّر الحفظ، حاول مرة أخرى"); return; }
    setEditing(false); await load(); router.refresh();
  };
  const remove = async () => {
    await fetch(`/api/products/${encodeURIComponent(id)}/reviews`, { method: "DELETE" });
    setRating(0); setText(""); setSize(""); setFit(""); await load(); router.refresh();
  };
  const edit = () => { if (d?.mine) { setRating(d.mine.rating); setText(d.mine.text); setSize(d.mine.size); setFit(d.mine.fit); setEditing(true); } };

  if (!d) return <section id="reviews" className="mt-12 border-t border-line pt-8"><div className="skeleton h-24 w-full" /></section>;
  const max = Math.max(1, ...d.dist);
  const fitTotal = d.fits.small + d.fits.true + d.fits.large;
  const showForm = d.canReview && (!d.mine || editing);

  return (
    <section id="reviews" className="mt-12 border-t border-line pt-8" aria-labelledby="rev-h">
      <h2 id="rev-h" className="mb-5 text-xl font-semibold">التقييمات</h2>
      {d.count > 0 ? (
        <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-10">
          <div>
            <div className="text-4xl font-semibold" dir="ltr">{d.avg}</div>
            <Stars value={d.avg} size={18} />
            <div className="mt-1 text-sm text-muted">{d.count} تقييم</div>
          </div>
          <div className="space-y-1.5" dir="ltr">
            {[5, 4, 3, 2, 1].map((s) => (
              <div key={s} className="flex items-center gap-3 text-sm"><span className="w-3 text-muted">{s}</span>
                <div className="h-2 flex-1 bg-tile"><div className="h-2 bg-ink" style={{ width: `${(d.dist[s - 1] / max) * 100}%` }} /></div>
                <span className="w-6 text-muted">{d.dist[s - 1]}</span></div>
            ))}
          </div>
        </div>
      ) : <p className="text-sm text-muted">لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج.</p>}

      {fitTotal > 0 && (
        <p className="mt-5 text-sm text-muted">
          {(["small", "true", "large"] as const).filter((k) => d.fits[k]).map((k) => `${FIT_LABEL[k]}: ${Math.round((d.fits[k] / fitTotal) * 100)}%`).join(" · ")}
        </p>
      )}

      <div className="mt-6">
        {!d.canReview && <p className="text-sm"><Link href={`/login?next=${encodeURIComponent(`/product/${id}`)}`} className="underline">سجّل الدخول</Link> لإضافة تقييمك.</p>}
        {d.canReview && d.mine && !editing && (
          <p className="text-sm text-muted">شكراً لتقييمك. <button className="underline" onClick={edit}>تعديل</button> · <button className="underline" onClick={remove}>حذف</button></p>
        )}
        {showForm && (
          <form onSubmit={submit} className="space-y-4 border border-line p-4">
            <div>
              <div className="mb-1 text-sm">تقييمك</div>
              <div className="flex gap-1" dir="ltr" role="radiogroup" aria-label="التقييم">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button type="button" key={i} role="radio" aria-checked={rating === i} aria-label={`${i} نجوم`} onClick={() => setRating(i)} className="p-0.5">
                    <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" fill={i <= rating ? "#1a1a1a" : "#d4d4d0"} /></svg>
                  </button>
                ))}
              </div>
            </div>
            <textarea className="field min-h-24 w-full" placeholder="اكتب رأيك في الخامة والمقاس والجودة (اختياري)" maxLength={1000} value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex flex-wrap gap-3">
              {sizes.length > 0 && (
                <select className="field w-auto" value={size} onChange={(e) => setSize(e.target.value)} aria-label="المقاس الذي اشتريته">
                  <option value="">المقاس الذي اشتريته</option>{sizes.map((s) => <option key={s}>{s}</option>)}
                </select>
              )}
              <select className="field w-auto" value={fit} onChange={(e) => setFit(e.target.value)} aria-label="هل المقاس مضبوط؟">
                <option value="">هل المقاس مضبوط؟</option>
                {Object.entries(FIT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            {err && <p className="text-sm text-red-700">{err}</p>}
            <div className="flex gap-2"><button className="btn" disabled={busy}>{d.mine ? "حفظ التعديل" : "نشر التقييم"}</button>{editing && <button type="button" className="btn btn-line" onClick={() => setEditing(false)}>إلغاء</button>}</div>
          </form>
        )}
      </div>

      <ul className="mt-6 divide-y divide-line">
        {d.items.map((r) => (
          <li key={r.id} className="py-4">
            <div className="flex items-center gap-3"><Stars value={r.rating} /><span className="text-sm font-medium">{r.name}</span>
              <time className="text-xs text-muted" dateTime={r.date}>{new Date(r.date).toLocaleDateString("ar-EG")}</time></div>
            {r.text && <p className="mt-2 whitespace-pre-line leading-7 text-[#444]">{r.text}</p>}
            {(r.size || r.fit) && <p className="mt-1 text-xs text-muted">{[r.size && `المقاس: ${r.size}`, r.fit && FIT_LABEL[r.fit]].filter(Boolean).join(" · ")}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
