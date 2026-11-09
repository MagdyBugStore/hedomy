export const money = (n: number | null | undefined) =>
  n == null ? "السعر عند الاستفسار" : `${Math.round(n).toLocaleString("en-US")} ج.م`;

/** Resize Shopify CDN images; leave everything else untouched. */
export function imgSrc(url: string | undefined, width = 600): string {
  if (!url) return "/placeholder.svg";
  if (/cdn\.shopify\.com/.test(url)) {
    const u = url.replace(/([?&])width=\d+&?/, "$1").replace(/[?&]$/, "");
    return u + (u.includes("?") ? "&" : "?") + `width=${width}`;
  }
  return url;
}

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];
export const sizeRank = (s: string) => {
  const i = SIZE_ORDER.indexOf(s);
  if (i >= 0) return i;
  const n = parseFloat(s);
  return Number.isFinite(n) ? 20 + n : 1000;
};
