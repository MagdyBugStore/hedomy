"use client";
import Link from "next/link";
import { useStore } from "@/components/Providers";
import { imgSrc, money } from "@/lib/format";
import { FREE_SHIP_OVER } from "@/lib/config";

export default function CartPage() {
  const { cart, setQty, subtotal, shipping, total } = useStore();
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:px-8">
      <h1 className="mb-8 text-2xl font-semibold">السلة</h1>
      {cart.length === 0 ? (
        <div className="py-20 text-center text-muted">
          <p>السلة فاضية.</p>
          <p className="mt-2 text-xs">منتجات البراندات الخارجية تُشترى مباشرة من موقع البراند.</p>
          <Link href="/shop" className="btn mt-6">تصفح المتجر</Link>
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-line border-y border-line">
            {cart.map((l) => (
              <li key={l.id + l.size} className="flex gap-4 py-5">
                <Link href={`/product/${encodeURIComponent(l.id)}`} className="h-28 w-[84px] shrink-0 bg-tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc(l.image, 200)} alt="" className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div><div className="text-xs text-muted">{l.brand}</div><div>{l.title}</div><div className="mt-1 text-sm text-muted">المقاس: {l.size}</div></div>
                    <div className="font-semibold">{money(l.price * l.qty)}</div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-line bg-surface">
                      <button className="h-9 w-9" onClick={() => setQty(l.id, l.size, l.qty - 1)} aria-label="إنقاص">−</button>
                      <span className="w-8 text-center" aria-live="polite">{l.qty}</span>
                      <button className="h-9 w-9" onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="زيادة">+</button>
                    </div>
                    <button className="text-sm text-muted underline" onClick={() => setQty(l.id, l.size, 0)}>حذف</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit bg-surface p-6">
            <h2 className="mb-4 font-semibold">ملخص الطلب</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt>المجموع</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>الشحن</dt><dd>{shipping ? money(shipping) : "مجاني"}</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>الإجمالي</dt><dd>{money(total)}</dd></div>
            </dl>
            {shipping > 0 && <p className="mt-3 text-xs text-muted">أضف {money(FREE_SHIP_OVER - subtotal)} للحصول على شحن مجاني.</p>}
            <Link href="/checkout" className="btn mt-5 w-full">إتمام الطلب</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
