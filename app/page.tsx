import Link from "next/link";
import { api } from "@/lib/api";
import type { BrandInfo, ProductDTO } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import BrandLogo from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

function Section({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-8 max-w-[1480px] px-4 md:px-8">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={href} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">عرض الكل</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">{children}</div>
    </section>
  );
}

export default async function Home() {
  const d = (await api<{ fresh: ProductDTO[]; sale: ProductDTO[]; own: ProductDTO[]; brands: BrandInfo[] }>("/api/home")) ?? { fresh: [], sale: [], own: [], brands: [] };
  return (
    <>
      <div className="mx-auto max-w-[1480px] px-4 pt-10 text-center md:px-8">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">ملابس من أفضل البراندات المصرية</h1>
        <p className="mt-3 text-muted">{d.brands.length} براند · آلاف الموديلات للنساء والرجال والأطفال في مكان واحد</p>
      </div>
      <form action="/shop" role="search" className="mx-auto mt-10 flex max-w-[1480px] justify-start px-4 md:px-8">
        <input name="q" placeholder="ابحث عن منتج أو براند" aria-label="بحث" className="h-11 w-full rounded-full bg-surface px-5 text-sm outline-none focus:shadow-[inset_0_0_0_1px_var(--ink)] md:w-80" />
      </form>
      <Section title="وصل حديثاً" href="/shop">{d.fresh.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 4} />)}</Section>
      {d.own.length > 0 && <Section title="من هدومي" href="/shop?brand=tg-mahmoud,tg-bedaya">{d.own.map((p) => <ProductCard key={p.id} p={p} />)}</Section>}
      <Section title="تخفيضات" href="/shop?sale=1&sort=discount">{d.sale.map((p) => <ProductCard key={p.id} p={p} />)}</Section>
      <section className="mx-auto mt-16 max-w-[1480px] px-4 md:px-8">
        <h2 className="mb-5 text-xl font-semibold"><Link href="/brands">البراندات</Link></h2>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 lg:grid-cols-8">
          {d.brands.map((b) => (
            <Link key={b.key} href={`/brand/${b.key}`} className="group" title={b.name}>
              <BrandLogo name={b.name} logo={b.logo} pad="p-4" className="aspect-[3/2] border border-line text-sm transition group-hover:border-ink" />
              <div className="mt-1 truncate text-center text-xs text-muted">{b.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
