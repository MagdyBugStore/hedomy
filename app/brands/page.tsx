import Link from "next/link";
import { api } from "@/lib/api";
import type { BrandInfo } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";

export const dynamic = "force-dynamic";
export const metadata = { title: "البراندات" };

export default async function BrandsPage() {
  const rows = (await api<{ brands: BrandInfo[] }>("/api/brands"))?.brands ?? [];
  return (
    <div className="mx-auto max-w-[1480px] px-4 py-10 md:px-8">
      <h1 className="mb-8 text-2xl font-semibold">البراندات <span className="text-base font-normal text-muted">({rows.length})</span></h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {rows.map((b) => (
          <Link key={b.key} href={`/brand/${b.key}`} className="group block">
            <BrandLogo name={b.name} logo={b.logo} pad="p-8" className="aspect-[3/2] border border-line transition group-hover:border-ink" />
            <div className="mt-2 flex items-baseline justify-between"><span className="font-medium">{b.name}</span><span className="text-xs text-muted">{b.count} منتج</span></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
