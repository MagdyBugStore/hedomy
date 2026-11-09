import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata = { title: "المتجر" };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-muted">جاري التحميل…</div>}>
      <ShopClient />
    </Suspense>
  );
}
