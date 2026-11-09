import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { Logo } from "@/lib/types";
import ShopClient from "@/components/ShopClient";

export const dynamic = "force-dynamic";
type Brand = { key: string; name: string; logo?: Logo };

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const b = await api<Brand>(`/api/brands/${(await params).key}`);
  return { title: b?.name || "براند غير موجود" };
}

export default async function BrandPage({ params }: { params: Promise<{ key: string }> }) {
  const key = (await params).key;
  const b = await api<Brand>(`/api/brands/${encodeURIComponent(key)}`);
  if (!b) notFound();
  return (
    <Suspense fallback={<div className="p-16 text-center text-muted">جاري التحميل…</div>}>
      <ShopClient lockBrand={key} brandName={b.name} logo={b.logo} />
    </Suspense>
  );
}
