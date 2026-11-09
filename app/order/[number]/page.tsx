"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { money } from "@/lib/format";

type Last = { number: string; total: number; wa: string; redirected?: boolean };

export default function OrderDone() {
  const { number } = useParams<{ number: string }>();
  const [o, setO] = useState<Last | null>(null);
  const done = useRef(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("hdoumi_last_order");
      const last = raw ? (JSON.parse(raw) as Last) : null;
      if (last && last.number === number) {
        setO(last);
        if (!last.redirected && !done.current) {
          done.current = true;
          sessionStorage.setItem("hdoumi_last_order", JSON.stringify({ ...last, redirected: true }));
          setTimeout(() => { location.href = last.wa; }, 2000);
        }
      }
    } catch { /* ignore */ }
  }, [number]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">تم استلام طلبك</h1>
      <p className="mt-4"><span className="bg-surface px-4 py-2">طلب رقم <bdi>{number}</bdi></span></p>
      {o && <p className="mt-4 text-muted">الإجمالي: {money(o.total)}</p>}
      {o ? (
        <>
          <p className="mt-4 text-muted" role="status">جاري تحويلك إلى واتساب لتأكيد الطلب…</p>
          <a href={o.wa} className="btn mt-6">افتح واتساب الآن</a>
        </>
      ) : (
        <p className="mt-4 text-muted">احتفظ برقم الطلب وتواصل معنا على واتساب لو احتجت أي مساعدة.</p>
      )}
      <div className="mt-4"><Link href="/shop" className="text-sm underline">واصل التسوّق</Link></div>
    </div>
  );
}
