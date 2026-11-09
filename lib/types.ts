export type ProductDTO = {
  id: string;
  origin: "brand" | "telegram";
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
};

export type CartLine = { id: string; size: string; qty: number; title: string; brand: string; price: number; image: string };

export type Logo = { file: string; light?: boolean };
export type BrandInfo = { key: string; name: string; count: number; logo?: Logo };
export type NavData = {
  cats: { key: string; label: string; kinds: { kind: string; count: number }[] }[];
  brands: BrandInfo[];
};
