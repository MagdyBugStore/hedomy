import type { MetadataRoute } from "next";
import { api } from "@/lib/api";
import type { NavData } from "@/lib/types";
import { SITE_URL, productPath, shopPath } from "@/lib/site";

export const dynamic = "force-dynamic";
const SIZE = 5000;

/** id 0 = static pages, categories and brands; id 1.. = products in chunks of 5000 */
export async function generateSitemaps() {
  const f = await api<{ total: number }>(`/api/seo/products?size=1`).catch(() => null);
  const n = Math.max(1, Math.ceil((f?.total || 0) / SIZE));
  return [{ id: 0 }, ...Array.from({ length: n }, (_, i) => ({ id: i + 1 }))];
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = +(await props.id);
  const u = (p: string) => SITE_URL + p;
  if (id === 0) {
    const nav = (await api<NavData>("/api/nav").catch(() => null)) ?? { cats: [], brands: [] };
    const now = new Date();
    return [
      { url: u("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
      { url: u("/shop"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
      { url: u("/brands"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      ...nav.cats.flatMap((c) => [
        { url: u(shopPath(c.key)), lastModified: now, changeFrequency: "daily" as const, priority: 0.9 },
        ...c.kinds.map((k) => ({ url: u(shopPath(c.key, k.kind)), lastModified: now, changeFrequency: "daily" as const, priority: 0.7 })),
      ]),
      ...nav.brands.map((b) => ({ url: u(`/brand/${b.key}`), lastModified: now, changeFrequency: "daily" as const, priority: 0.7 })),
    ];
  }
  const d = await api<{ items: { id: string; title: string; kind: string; brand: string; updatedAt: string | null }[] }>(`/api/seo/products?page=${id}&size=${SIZE}`).catch(() => null);
  return (d?.items ?? []).map((p) => ({
    url: u(productPath({ id: p.id, title: p.title, kind: p.kind, brand: p.brand })),
    lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined, changeFrequency: "weekly" as const, priority: 0.6,
  }));
}
