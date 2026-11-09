import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import type { NavData } from "@/lib/types";

export const dynamic = "force-dynamic";

const tajawal = Tajawal({ variable: "--font-tajawal", subsets: ["arabic", "latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: { default: "هدومي — ملابس من أفضل البراندات المصرية", template: "%s — هدومي" },
  description: "تسوق ملابس نساء ورجال وأطفال من أفضل البراندات المصرية في مكان واحد.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = (await api<NavData>("/api/nav").catch(() => null)) ?? { cats: [], brands: [] };
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <StoreProvider>
          <Header nav={nav} />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
