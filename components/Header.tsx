"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./Providers";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";
import { SITE_NAME } from "@/lib/config";
import type { NavData } from "@/lib/types";
import BrandLogo from "./BrandLogo";

const trigger = "inline-flex items-center gap-1 px-3 py-2 text-sm text-ink/70 hover:text-ink group-hover:text-ink group-focus-within:text-ink";
const panel = "invisible absolute right-0 top-full z-50 min-w-[220px] border border-line bg-surface p-4 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";
const Chevron = () => <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M1 1l4 4 4-4" /></svg>;

export default function Header({ nav }: { nav: NavData }) {
  const { count, favs, user, authReady, setUser } = useStore();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  if (path.startsWith("/admin")) return null;
  const close = () => setMenu(false);
  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-[1480px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
        <nav className="hidden items-center md:flex" aria-label="الأقسام">
          <Link href="/shop" className={trigger}>كل الملابس</Link>
          {nav.cats.map((c) => (
            <div key={c.key} className="group relative">
              <Link href={`/shop?cat=${c.key}`} className={trigger}>{c.label} <Chevron /></Link>
              <div className={panel}>
                <ul className="space-y-1.5 text-sm">
                  <li><Link href={`/shop?cat=${c.key}`} className="font-semibold hover:underline">كل {c.label}</Link></li>
                  {c.kinds.map((k) => (
                    <li key={k.kind}><Link href={`/shop?cat=${c.key}&kind=${encodeURIComponent(k.kind)}`} className="flex justify-between gap-6 text-ink/80 hover:text-ink hover:underline">{k.kind}<span className="text-xs text-muted">{k.count}</span></Link></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="group relative">
            <Link href="/brands" className={trigger}>البراندات <Chevron /></Link>
            <div className={`${panel} w-[520px] max-w-[80vw]`}>
              <ul className="grid max-h-[60vh] grid-cols-2 gap-x-6 gap-y-1.5 overflow-y-auto text-sm">
                {nav.brands.map((b) => (<li key={b.key}><Link href={`/brand/${b.key}`} className="flex items-center gap-2.5 text-ink/80 hover:text-ink hover:underline"><BrandLogo name={b.name} logo={b.logo} pad="p-1" className="h-8 w-12 shrink-0 border border-line text-[10px]" /><span className="flex-1">{b.name}</span><span className="text-xs text-muted">{b.count}</span></Link></li>))}
              </ul>
              <Link href="/brands" className="mt-3 block border-t border-line pt-3 text-sm font-semibold hover:underline">كل البراندات</Link>
            </div>
          </div>
          <Link href="/shop?sale=1" className={trigger}>تخفيضات</Link>
          <Link href="/gallery" className={`${trigger} font-medium !text-ink`}>✦ المعرض</Link>
        </nav>
        <button className="grid h-10 w-10 place-items-center justify-self-start md:hidden" aria-label="القائمة" onClick={() => setMenu(true)}><MenuIcon /></button>
        <Link href="/" className="justify-self-center text-2xl font-semibold tracking-tight">{SITE_NAME}</Link>
        <div className="flex items-center justify-self-end gap-1">
          {authReady && (user ? (
            <div className="group relative">
              <button className="grid h-10 place-items-center px-2 text-sm hover:opacity-70" aria-label="حسابي">{user.name.split(" ")[0]}</button>
              <div className={`${panel} !right-auto left-0 min-w-[160px]`}>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/gallery" className="hover:underline">معرضي</Link></li>
                  <li><Link href="/favorites" className="hover:underline">المفضلة</Link></li>
                  <li><button className="hover:underline" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); }}>تسجيل الخروج</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/login" className="px-2 text-sm hover:opacity-70">دخول</Link>
          ))}
          <Link href="/shop?focus=search" aria-label="بحث" className="grid h-10 w-10 place-items-center hover:opacity-70"><SearchIcon /></Link>
          <Link href="/favorites" aria-label="المفضلة" className="relative grid h-10 w-10 place-items-center hover:opacity-70">
            <HeartIcon />
            {favs.length > 0 && <span className="absolute left-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] text-white">{favs.length}</span>}
          </Link>
          <Link href="/cart" aria-label="السلة" className="relative grid h-10 w-10 place-items-center hover:opacity-70">
            <BagIcon />
            {count > 0 && <span className="absolute left-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] text-white">{count}</span>}
          </Link>
        </div>
      </div>

    </header>
      {/* mobile menu (outside header: its backdrop-filter would trap position:fixed) */}
      <div className={`fixed inset-0 z-[70] bg-bg transition-transform md:hidden ${menu ? "translate-x-0" : "translate-x-full invisible"}`} role="dialog" aria-label="القائمة">
        <div className="flex h-16 items-center justify-between border-b border-line px-4"><strong className="text-xl">{SITE_NAME}</strong><button onClick={close} aria-label="إغلاق"><CloseIcon /></button></div>
        <div className="h-[calc(100dvh-4rem)] space-y-1 overflow-y-auto p-4">
          <Link href="/shop" onClick={close} className="block py-2.5 font-medium">كل الملابس</Link>
          {nav.cats.map((c) => (
            <div key={c.key} className="border-t border-line">
              <div className="flex items-stretch">
                <Link href={`/shop?cat=${c.key}`} onClick={close} className="flex-1 py-2.5 font-medium">{c.label}</Link>
                <button type="button" aria-label={`أقسام ${c.label}`} aria-expanded={open === c.key} onClick={() => setOpen(open === c.key ? null : c.key)} className="grid w-12 place-items-center"><span className={`transition-transform ${open === c.key ? "rotate-180" : ""}`}><Chevron /></span></button>
              </div>
              {open === c.key && (
                <ul className="mb-2 space-y-2 ps-3 text-sm">
                  <li><Link onClick={close} href={`/shop?cat=${c.key}`} className="font-semibold">كل {c.label}</Link></li>
                  {c.kinds.map((k) => (<li key={k.kind}><Link onClick={close} href={`/shop?cat=${c.key}&kind=${encodeURIComponent(k.kind)}`}>{k.kind}</Link></li>))}
                </ul>
              )}
            </div>
          ))}
          <details className="border-t border-line py-2.5">
            <summary className="cursor-pointer font-medium">البراندات</summary>
            <ul className="mt-2 space-y-2 ps-3 text-sm">
              <li><Link onClick={close} href="/brands" className="font-semibold">كل البراندات</Link></li>
              {nav.brands.map((b) => (<li key={b.key}><Link onClick={close} href={`/brand/${b.key}`}>{b.name}</Link></li>))}
            </ul>
          </details>
          <Link href="/shop?sale=1" onClick={close} className="block border-t border-line py-2.5 font-medium">تخفيضات</Link>
          <Link href="/gallery" onClick={close} className="block border-t border-line py-2.5 font-medium">✦ المعرض</Link>
          {authReady && !user && <Link href="/login" onClick={close} className="block border-t border-line py-2.5 font-medium">تسجيل الدخول</Link>}
        </div>
      </div>
    </>
  );
}
