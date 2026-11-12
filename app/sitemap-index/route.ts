import { api } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
const SIZE = 5000;

/** Sitemap index: /sitemap/0.xml (pages, categories, brands) + /sitemap/1.xml … (products, 5000 each) */
export async function GET() {
  const f = await api<{ total: number }>(`/api/seo/products?size=1`).catch(() => null);
  const n = Math.max(1, Math.ceil((f?.total || 0) / SIZE));
  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    Array.from({ length: n + 1 }, (_, i) => `<sitemap><loc>${SITE_URL}/sitemap/${i}.xml</loc><lastmod>${now}</lastmod></sitemap>`).join("\n") + `\n</sitemapindex>`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=900" } });
}
