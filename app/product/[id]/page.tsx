import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { ProductDTO } from "@/lib/types";
import { money } from "@/lib/format";
import { CAT_LABEL } from "@/lib/config";
import Gallery from "@/components/Gallery";
import BuyBox from "@/components/BuyBox";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const load = (id: string) => api<ProductDTO>(`/api/products/${id}`);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = await load((await params).id);
  return { title: p ? `${p.title} — ${p.brand}` : "منتج غير موجود" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await load((await params).id);
  if (!p) notFound();
  const rel = (await api<{ items: ProductDTO[] }>(`/api/products/${encodeURIComponent(p.id)}/related`))?.items ?? [];
  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-8 md:px-8">
      <nav className="mb-6 text-sm text-muted" aria-label="مسار التنقل">
        <Link href="/shop" className="hover:text-ink">المتجر</Link> / <Link href={`/shop?cat=${p.category}`} className="hover:text-ink">{CAT_LABEL[p.category]}</Link> / <span className="text-ink">{p.kind}</span>
      </nav>
      <div className="grid gap-8 md:grid-cols-2 md:gap-14">
        <Gallery images={p.images} alt={p.title} />
        <div className="md:pt-4">
          <Link href={`/brand/${p.brandKey}`} className="text-sm text-muted hover:text-ink">{p.brand}</Link>
          <h1 className="mt-1 text-2xl font-semibold leading-snug md:text-3xl">{p.title}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{money(p.price)}</span>
            {p.compareAt && <span className="text-muted line-through">{money(p.compareAt)}</span>}
            {p.discount > 0 && <span className="bg-ink px-2 py-0.5 text-xs text-white">خصم {p.discount}%</span>}
          </div>
          {!p.available && <p className="mt-3 text-sm text-red-700">غير متوفر حالياً</p>}
          <BuyBox p={p} />
          {p.description && <p className="mt-8 whitespace-pre-line border-t border-line pt-6 leading-8 text-[#444]">{p.description}</p>}
        </div>
      </div>
      {rel.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-5 text-xl font-semibold">منتجات مشابهة</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">{rel.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </div>
  );
}
