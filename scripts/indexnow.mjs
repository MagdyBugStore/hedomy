// Push every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver … and through them AI search that rides on Bing).
// Usage: node scripts/indexnow.mjs [https://your-domain]   (default: NEXT_PUBLIC_SITE_URL or https://zad.royaty.net)
const KEY = "e7d0d37207f99fe47647df094f4ca4d4";
const SITE = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "https://zad.royaty.net").replace(/\/+$/, "");
const get = async (u) => (await fetch(u)).text();
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = [];
for (const s of locs(await get(SITE + "/sitemap.xml"))) urls.push(...locs(await get(s.replace(/^https?:\/\/[^/]+/, SITE))));
const host = new URL(SITE).host;
console.log(urls.length, "urls");
for (let i = 0; i < urls.length; i += 9000) {
  const r = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ host, key: KEY, keyLocation: SITE + "/" + KEY + ".txt", urlList: urls.slice(i, i + 9000) }) });
  console.log("batch", i / 9000 + 1, r.status, r.statusText);
}
