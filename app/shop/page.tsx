import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import SeoList from "@/components/SeoList";
import JsonLd from "@/components/JsonLd";
import { CAT_LABEL, shopPath } from "@/lib/site";
import { collectionLd, describe, listing, meta } from "@/lib/seo-shop";

export const dynamic = "force-dynamic";
type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

/** Old-style /shop?cat=women&kind=قمصان links point their canonical at the clean URL; every other filter/sort/search combination is noindex. */
export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams, keys = Object.keys(sp).filter((k) => k !== "focus");
  const cat = one(sp.cat), kind = one(sp.kind);
  if (!keys.length) return meta("كل الملابس", "تصفح آلاف الموديلات للنساء والرجال والأطفال من أفضل البراندات المصرية في مكان واحد، مع فلاتر للمقاس واللون والخامة والسعر.", "/shop");
  if (CAT_LABEL[cat] && keys.every((k) => k === "cat" || k === "kind") && !kind.includes(",")) return meta(kind ? `${kind} ${CAT_LABEL[cat]}` : CAT_LABEL[cat], "", shopPath(cat, kind || undefined), { noindex: true });
  if (keys.length === 1 && sp.sale) return meta("تخفيضات", "أقوى تخفيضات الملابس من البراندات المصرية — خصومات على موديلات النساء والرجال والأطفال.", "/shop?sale=1");
  return meta("المتجر", "", "/shop", { noindex: true });
}

export default async function ShopPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams, keys = Object.keys(sp).filter((k) => k !== "focus");
  const r = await listing(keys.length ? new URLSearchParams(Object.entries(sp).flatMap(([k, v]) => [v ?? ""].flat().map((x) => [k, x] as [string, string]))).toString() : "limit=24");
  const title = sp.sale ? "تخفيضات" : "كل الملابس";
  return (
    <>
      <JsonLd data={collectionLd(title, "/shop", describe("ملابس", r), r.items, [{ name: title }])} />
      <Suspense fallback={<SeoList title={title} intro={describe("ملابس", r)} items={r.items} />}><ShopClient /></Suspense>
    </>
  );
}
