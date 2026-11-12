import Link from "next/link";
import type { ProductDTO } from "@/lib/types";
import { productPath } from "@/lib/site";
import { money } from "@/lib/format";
import ProductCard from "./ProductCard";

/** Server-rendered product grid. Used as the <Suspense> fallback of the (client-side) shop so crawlers and AI bots get real HTML content. */
export default function SeoList({ title, intro, items }: { title: string; intro?: string; items: ProductDTO[] }) {
  return (
    <div className="mx-auto max-w-[1480px] px-4 md:px-8">
      <div className="pb-5 pt-7"><h1 className="text-xl font-semibold md:text-2xl">{title}</h1>{intro && <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{intro}</p>}</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      <ul className="sr-only">{items.map((p) => <li key={p.id}><Link href={productPath(p)}>{p.title} — {p.brand} — {money(p.price)}</Link></li>)}</ul>
    </div>
  );
}
