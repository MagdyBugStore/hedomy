import { api } from "@/lib/api";
import type { NavData } from "@/lib/types";
import { SITE_DESC, SITE_NAME, SITE_URL, shopPath } from "@/lib/site";

export const dynamic = "force-dynamic";

/** llms.txt — a plain-Markdown map of the site for AI assistants (ChatGPT, Claude, Perplexity, Gemini …). */
export async function GET() {
  const nav = (await api<NavData>("/api/nav").catch(() => null)) ?? { cats: [], brands: [] };
  const L: string[] = [
    `# ${SITE_NAME} (Hedomy)`, "",
    `> ${SITE_DESC}`, "",
    `${SITE_NAME} is an Arabic (RTL) fashion marketplace for Egypt. It aggregates thousands of products from Egyptian clothing brands and local Instagram/Telegram sellers. Prices are in Egyptian pounds (EGP). Each product page lists brand, price, sizes, colours, fabric/materials, size guide, customer reviews and a direct way to order or ask the seller. Brand-site products link out to the brand's own store; seller products open a WhatsApp inquiry with the seller.`, "",
    "## Main pages", "",
    `- [Home](${SITE_URL}/): new arrivals, sales, brands`,
    `- [All clothing](${SITE_URL}/shop): searchable catalogue with filters (size, colour, fabric, fit, price, rating)`,
    `- [Brands](${SITE_URL}/brands): all ${nav.brands.length} brands`,
    `- [Sale](${SITE_URL}/shop?sale=1): discounted products`, "",
    "## Categories", "",
    ...nav.cats.flatMap((c) => [`- [${c.label}](${SITE_URL}${shopPath(c.key)})`, ...c.kinds.slice(0, 40).map((k) => `  - [${k.kind} — ${c.label}](${SITE_URL}${shopPath(c.key, k.kind)}) (${k.count})`)]), "",
    "## Brands", "",
    ...nav.brands.map((b) => `- [${b.name}](${SITE_URL}/brand/${b.key}) (${b.count} products)`), "",
    "## Machine-readable", "",
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "- Every product page embeds schema.org Product, BreadcrumbList and AggregateRating JSON-LD.", "",
  ];
  return new Response(L.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
