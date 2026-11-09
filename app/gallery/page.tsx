import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import GalleryClient from "@/components/GalleryClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "المعرض" };

export default async function GalleryPage() {
  const me = await api<{ user: { id: string } | null }>("/api/auth/me");
  if (!me?.user) redirect("/login?next=/gallery");
  return <GalleryClient />;
}
