"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, SITE_NAME, WHATSAPP } from "@/lib/config";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-start justify-between gap-8 px-4 py-10 text-sm text-muted md:px-8">
        <div>
          <div className="text-lg font-semibold text-ink">{SITE_NAME}</div>
          <p className="mt-2 max-w-xs">ملابس من أفضل البراندات المصرية في مكان واحد.</p>
        </div>
        <ul className="space-y-2">
          {CATEGORIES.map((c) => (<li key={c.key}><Link href={`/shop?cat=${c.key}`} className="hover:text-ink">{c.label}</Link></li>))}
        </ul>
        <ul className="space-y-2">
          <li><Link href="/favorites" className="hover:text-ink">المفضلة</Link></li>
          <li><Link href="/cart" className="hover:text-ink">السلة</Link></li>
          <li><Link href="/privacy" className="hover:text-ink">سياسة الخصوصية</Link></li>
          <li><a href={`https://wa.me/${WHATSAPP}`} className="hover:text-ink" rel="noopener">تواصل عبر واتساب</a></li>
        </ul>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {SITE_NAME}</div>
    </footer>
  );
}
