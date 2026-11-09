import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "لوحة التحكم", robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const me = await api<{ admin: boolean }>("/api/admin/me");
  if (!me?.admin) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-6">
          <strong className="text-lg">لوحة هدومي</strong>
          <Link href="/admin" className="text-sm hover:underline">الطلبات</Link>
          <Link href="/admin/products" className="text-sm hover:underline">المنتجات</Link>
          <Link href="/admin/merchants" className="text-sm hover:underline">التجار</Link>
          <Link href="/" className="text-sm text-muted hover:underline">الموقع ↗</Link>
        </div>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
