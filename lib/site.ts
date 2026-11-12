import { CAT_LABEL, SITE_NAME } from "./config";
import type { ProductDTO } from "./types";

/** Public origin of the site. Set NEXT_PUBLIC_SITE_URL when the domain changes; everything (canonicals, sitemap, JSON-LD) follows. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://zad.royaty.net").replace(/\/+$/, "");
export const SITE_DESC = "هدومي — تسوق ملابس نساء ورجال وأطفال من أفضل البراندات المصرية وأشهر البيجات المحلية في مكان واحد: عبايات، فساتين، تيشرتات، جاكيتات، شنط وإكسسوارات بأسعار واضحة وتواصل مباشر مع التاجر.";

export const abs = (u?: string) => (!u ? "" : /^https?:\/\//.test(u) ? u : u.startsWith("//") ? "https:" + u : SITE_URL + (u.startsWith("/") ? u : "/" + u));

/** Readable URL slug that keeps Arabic letters: "قميص كتان أبيض" -> "قميص-كتان-أبيض". */
export const slugify = (s: string, max = 70) =>
  s.normalize("NFKC").toLowerCase().replace(/[ً-ٰٟـ]/g, "").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, max).replace(/-+$/g, "");

export const productSlug = (p: Pick<ProductDTO, "title" | "kind" | "brand">) => slugify(p.title) || slugify(`${p.kind} ${p.brand}`);
/** Canonical product URL path: /product/<id>/<slug> */
export const productPath = (p: Pick<ProductDTO, "id" | "title" | "kind" | "brand">) => `/product/${encodeURIComponent(p.id)}/${encodeURIComponent(productSlug(p))}`;
/** Clean category / kind landing path (instead of /shop?cat=..&kind=..) */
export const shopPath = (cat?: string, kind?: string) => (cat ? `/shop/${cat}${kind ? "/" + encodeURIComponent(kind) : ""}` : "/shop");

export const catLabel = (c: string) => CAT_LABEL[c] || c;
export { CAT_LABEL };
export { SITE_NAME };

export const ldScript = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");
