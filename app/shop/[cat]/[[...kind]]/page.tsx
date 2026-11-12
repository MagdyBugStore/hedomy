import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import SeoList from "@/components/SeoList";
import JsonLd from "@/components/JsonLd";
import { CAT_LABEL, shopPath } from "@/lib/site";
import { collectionLd, describe, listing, meta } from "@/lib/seo-shop";

export const dynamic = "force-dynamic";
type P = Promise<{ cat: string; kind?: string[] }>;
const parse = async (params: P) => {
  const { cat, kind } = await params;
  let k = ""; try { k = decodeURIComponent((kind || []).join("/")); } catch { /* ignore */ }
  return { cat, kind: k, extra: (kind || []).length > 1 };
};
const nameOf = (cat: string, kind: string) => (kind ? `${kind} ${CAT_LABEL[cat]}` : `ملابس ${CAT_LABEL[cat]}`);

/** Clean landing pages: /shop/women, /shop/women/قمصان */
export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const { cat, kind } = await parse(params);
  if (!CAT_LABEL[cat]) return { title: "غير موجود", robots: { index: false } };
  const r = await listing(`cat=${cat}${kind ? "&kind=" + encodeURIComponent(kind) : ""}&limit=1`);
  return meta(kind ? `${kind} ${CAT_LABEL[cat]}` : `ملابس ${CAT_LABEL[cat]}`, describe(nameOf(cat, kind), r), shopPath(cat, kind || undefined), { noindex: r.total === 0 });
}

export default async function CategoryPage({ params }: { params: P }) {
  const { cat, kind, extra } = await parse(params);
  if (!CAT_LABEL[cat]) notFound();
  if (extra) permanentRedirect(shopPath(cat, kind));
  const r = await listing(`cat=${cat}${kind ? "&kind=" + encodeURIComponent(kind) : ""}&limit=24`);
  if (kind && r.total === 0) notFound();
  const name = nameOf(cat, kind), d = describe(name, r);
  const crumbs = kind ? [{ name: CAT_LABEL[cat], path: shopPath(cat) }, { name: kind }] : [{ name: CAT_LABEL[cat] }];
  return (
    <>
      <JsonLd data={collectionLd(name, shopPath(cat, kind || undefined), d, r.items, crumbs)} />
      <Suspense fallback={<SeoList title={kind ? `${kind} — ${CAT_LABEL[cat]}` : `ملابس ${CAT_LABEL[cat]}`} intro={d} items={r.items} />}><ShopClient baseCat={cat} baseKind={kind || undefined} /></Suspense>
    </>
  );
}
