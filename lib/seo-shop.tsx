import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ProductDTO } from "@/lib/types";
import { CAT_LABEL, SITE_NAME } from "@/lib/config";
import { SITE_URL, abs, productPath, shopPath } from "@/lib/site";

type R = { items: ProductDTO[]; total: number; facets: { price: { min: number; max: number } } | null };

/** First page of a listing + meta/JSON-LD for it. Shared by /shop, /shop/<cat>/<kind> and /brand/<key>. */
export async function listing(qs: string) {
  return (await api<R>(`/api/products?${qs}&facets=1`).catch(() => null)) ?? { items: [], total: 0, facets: null };
}

export function describe(name: string, r: R, extra = "") {
  const from = r.facets?.price?.min ? ` بأسعار تبدأ من ${Math.round(r.facets.price.min).toLocaleString("en-US")} جنيه` : "";
  return `تسوق ${name} من أفضل البراندات المصرية على ${SITE_NAME}: ${r.total.toLocaleString("en-US")} موديل${from}. ${extra}قارن الأسعار والمقاسات والألوان وتواصل مع التاجر مباشرة.`.replace(/\s+/g, " ").trim();
}

export function meta(title: string, description: string, path: string, opts: { noindex?: boolean; image?: string } = {}): Metadata {
  const url = abs(path), img = opts.image ? abs(opts.image) : undefined;
  return {
    title, description, alternates: { canonical: url }, robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", url, siteName: SITE_NAME, locale: "ar_EG", title, description, images: img ? [{ url: img }] : undefined },
    twitter: { card: img ? "summary_large_image" : "summary", title, description, images: img ? [img] : undefined },
  };
}

export function collectionLd(name: string, path: string, description: string, items: ProductDTO[], crumbs: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", name, url: abs(path), description, inLanguage: "ar", isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        mainEntity: { "@type": "ItemList", itemListElement: items.slice(0, 24).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(productPath(p)), name: p.title })) } },
      { "@type": "BreadcrumbList", itemListElement: [{ name: SITE_NAME, path: "/" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.path ? { item: abs(c.path) } : {}) })) },
    ],
  };
}
export { CAT_LABEL, shopPath };
