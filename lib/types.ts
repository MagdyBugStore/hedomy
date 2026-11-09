export type ProductDTO = {
  id: string;
  origin: "brand" | "telegram" | "instagram";
  brand: string;
  brandKey: string;
  title: string;
  category: string;
  kind: string;
  price: number | null;
  compareAt: number | null;
  discount: number;
  sizes: string[];
  images: string[];
  url: string;
  description: string;
  available: boolean;
  allSizes: string[];
  colors: { key: string; name: string; hex: string }[];
  materials: string[];
  composition: string;
  fabricNote: string;
  fit: string;
  pattern: string;
  care: string[];
  specs: { label: string; value: string }[];
  sizeChartImage: string;
  details: { label: string; value: string }[];
  sizeChart: { unit: string; headers: string[]; rows: string[][] } | null;
  contact?: { wa: string; name: string } | null;
  stats: { views: number; likes: number; opens: number; rating: number; reviews: number };
};

export type CartLine = { id: string; size: string; qty: number; title: string; brand: string; price: number; image: string };

export type Logo = { file: string; light?: boolean };
export type BrandInfo = { key: string; name: string; count: number; logo?: Logo };
export type NavData = {
  cats: { key: string; label: string; kinds: { kind: string; count: number }[] }[];
  brands: BrandInfo[];
};

export type ReviewDTO = { id: string; name: string; rating: number; title: string; text: string; size: string; fit: string; date: string; mine?: boolean };
export type ReviewsDTO = { items: ReviewDTO[]; avg: number; count: number; dist: number[]; fits: { small: number; true: number; large: number }; canReview: boolean; mine: ReviewDTO | null };
