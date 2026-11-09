export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "هدومي";
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201015940126";
export const FREE_SHIP_OVER = 1800;
export const SHIPPING = 120;
export const PAGE_SIZE = 24;

export const CATEGORIES = [
  { key: "women", label: "نساء" },
  { key: "men", label: "رجال" },
  { key: "kids", label: "أطفال" },
] as const;
export const CAT_LABEL: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));

export const SORTS = [
  { key: "mix", label: "مقترح لك" },
  { key: "new", label: "الأحدث" },
  { key: "price_asc", label: "السعر: الأقل أولاً" },
  { key: "price_desc", label: "السعر: الأعلى أولاً" },
  { key: "discount", label: "الأعلى خصماً" },
  { key: "popular", label: "الأكثر إعجاباً" },
  { key: "viewed", label: "الأكثر مشاهدة" },
  { key: "rated", label: "الأعلى تقييماً" },
] as const;

export const ORDER_STATUSES: Record<string, string> = {
  new: "جديد",
  confirmed: "مؤكد",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};
