import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ProductDTO } from "@/lib/types";
import { money } from "@/lib/format";
import { CAT_LABEL } from "@/lib/config";
import { SITE_NAME, SITE_URL, abs, productPath, productSlug, shopPath } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Gallery from "@/components/Gallery";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";
import ProductTrack from "@/components/ProductTrack";
import Reviews from "@/components/Reviews";
import { StatsBar, Swatches, Specs, SizeGuide } from "@/components/ProductDetails";

export const dynamic = "force-dynamic";

const load = (id: string) => api<ProductDTO>(`/api/products/${id}`);

const clip = (t: string, n: number) => { const x = t.replace(/\s+/g, " ").trim(); return x.length > n ? x.slice(0, n - 1).trimEnd() + "…" : x; };
const descOf = (p: ProductDTO) => clip([
  `${p.title} من ${p.brand}`, p.price != null ? `بسعر ${Math.round(p.price).toLocaleString("en-US")} جنيه` : "", `${p.kind} ${CAT_LABEL[p.category] || ""}`.trim(),
  p.colors.length ? `الألوان: ${p.colors.slice(0, 4).map((c) => c.name).join("، ")}` : "", p.materials.length ? `الخامة: ${p.materials.slice(0, 2).join("، ")}` : "",
  p.allSizes.length ? `المقاسات: ${p.allSizes.slice(0, 6).join(" ")}` : "", p.description,
].filter(Boolean).join(". "), 160);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = await load((await params).id);
  if (!p) return { title: "منتج غير موجود", robots: { index: false } };
  const url = abs(productPath(p)), img = abs(p.images[0]);
  return {
    title: `${p.title} — ${p.brand}`, description: descOf(p), alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: SITE_NAME, locale: "ar_EG", title: `${p.title} — ${p.brand}`, description: descOf(p), images: img ? [{ url: img, alt: p.title }] : undefined },
    twitter: { card: "summary_large_image", title: `${p.title} — ${p.brand}`, description: descOf(p), images: img ? [img] : undefined },
    other: p.price != null ? { "product:price:amount": String(Math.round(p.price)), "product:price:currency": "EGP" } : undefined,
    robots: p.available ? undefined : { index: false, follow: true },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string; slug?: string[] }> }) {
  const { id, slug } = await params;
  const p = await load(id);
  if (!p) notFound();
  // one canonical URL per product: /product/<id>/<slug>
  let given = ""; try { given = decodeURIComponent((slug || []).join("/")); } catch { /* keep empty */ }
  if (given !== productSlug(p) || (slug || []).length > 1) permanentRedirect(productPath(p));
  const ld = {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Product", "@id": abs(productPath(p)) + "#product", name: p.title, sku: p.id, url: abs(productPath(p)), description: descOf(p),
        image: p.images.slice(0, 6).map(abs), brand: { "@type": "Brand", name: p.brand }, category: `${CAT_LABEL[p.category] || ""} > ${p.kind}`,
        ...(p.colors.length ? { color: p.colors.map((c) => c.name).join(", ") } : {}), ...(p.materials.length ? { material: p.materials.join(", ") } : {}),
        ...(p.stats.reviews > 0 ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.stats.rating, reviewCount: p.stats.reviews } } : {}),
        ...(p.price != null ? { offers: { "@type": "Offer", url: abs(productPath(p)), priceCurrency: "EGP", price: Math.round(p.price), itemCondition: "https://schema.org/NewCondition", availability: p.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", seller: { "@type": "Organization", name: p.brand } } } : {}),
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: CAT_LABEL[p.category] || p.category, item: abs(shopPath(p.category)) },
        { "@type": "ListItem", position: 3, name: p.kind, item: abs(shopPath(p.category, p.kind)) },
        { "@type": "ListItem", position: 4, name: p.title },
      ] },
    ],
  };
  const rel = (await api<{ items: ProductDTO[] }>(`/api/products/${encodeURIComponent(p.id)}/related`))?.items ?? [];
  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 md:px-8">
      <JsonLd data={ld} />
      <nav className="mb-6 text-sm text-muted" aria-label="مسار التنقل">
        <Link href="/shop" className="hover:text-ink">المتجر</Link> / <Link href={shopPath(p.category)} className="hover:text-ink">{CAT_LABEL[p.category]}</Link> / <Link href={shopPath(p.category, p.kind)} className="hover:text-ink">{p.kind}</Link>
      </nav>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
        <Gallery images={p.images} alt={p.title} />
        <div className="min-w-0 md:pt-4">
          <Link href={`/brand/${p.brandKey}`} className="text-sm text-muted hover:text-ink">{p.brand}</Link>
          <h1 className="mt-1 text-2xl font-semibold leading-snug md:text-3xl">{p.title}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{money(p.price)}</span>
            {p.compareAt && <span className="text-muted line-through">{money(p.compareAt)}</span>}
            {p.discount > 0 && <span className="bg-ink px-2 py-0.5 text-xs text-white">خصم {p.discount}%</span>}
          </div>
          <StatsBar p={p} />
          {!p.available && <p className="mt-3 text-sm text-red-700">غير متوفر حالياً</p>}
          <Swatches p={p} />
          <BuyBox p={p} />
          {p.description && <p className="mt-8 whitespace-pre-line border-t border-line pt-6 leading-8 text-[#444]">{p.description}</p>}
          <Specs p={p} />
          <SizeGuide p={p} />
        </div>
      </div>
      <div className="max-w-3xl"><Reviews id={p.id} sizes={p.allSizes.length ? p.allSizes : p.sizes} /></div>
      <ProductTrack id={p.id} />
      {rel.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-5 text-xl font-semibold">منتجات مشابهة</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">{rel.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </div>
  );
}
