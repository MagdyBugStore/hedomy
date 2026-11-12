import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { Logo } from "@/lib/types";
import ShopClient from "@/components/ShopClient";
import SeoList from "@/components/SeoList";
import JsonLd from "@/components/JsonLd";
import { collectionLd, describe, listing, meta } from "@/lib/seo-shop";

export const dynamic = "force-dynamic";
type Brand = { key: string; name: string; logo?: Logo };

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const key = (await params).key;
  const b = await api<Brand>(`/api/brands/${encodeURIComponent(key)}`);
  if (!b) return { title: "براند غير موجود", robots: { index: false } };
  const r = await listing(`only=${encodeURIComponent(key)}&limit=1`);
  return meta(`${b.name} — ملابس ${b.name} أونلاين`, describe(`ملابس ${b.name}`, r), `/brand/${key}`, { noindex: r.total === 0 });
}

export default async function BrandPage({ params }: { params: Promise<{ key: string }> }) {
  const key = (await params).key;
  const b = await api<Brand>(`/api/brands/${encodeURIComponent(key)}`);
  if (!b) notFound();
  const r = await listing(`only=${encodeURIComponent(key)}&limit=24`), d = describe(`ملابس ${b.name}`, r);
  return (
    <>
      <JsonLd data={collectionLd(b.name, `/brand/${key}`, d, r.items, [{ name: "البراندات", path: "/brands" }, { name: b.name }])} />
      <Suspense fallback={<SeoList title={b.name} intro={d} items={r.items} />}>
        <ShopClient lockBrand={key} brandName={b.name} logo={b.logo} />
      </Suspense>
    </>
  );
}
