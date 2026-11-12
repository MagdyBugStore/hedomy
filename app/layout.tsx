import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import type { NavData } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import { SITE_DESC, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const tajawal = Tajawal({ variable: "--font-tajawal", subsets: ["arabic", "latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "هدومي — ملابس من أفضل البراندات المصرية", template: "%s — هدومي" },
  description: SITE_DESC,
  applicationName: "هدومي",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "هدومي", locale: "ar_EG", url: SITE_URL, title: "هدومي — ملابس من أفضل البراندات المصرية", description: SITE_DESC },
  twitter: { card: "summary", title: "هدومي — ملابس من أفضل البراندات المصرية", description: SITE_DESC },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined, other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

const SITE_LD = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": SITE_URL + "/#org", name: "هدومي", alternateName: ["Hedomy", "hedomy"], url: SITE_URL, description: SITE_DESC, areaServed: { "@type": "Country", name: "Egypt" }, knowsLanguage: "ar" },
    { "@type": "WebSite", "@id": SITE_URL + "/#site", url: SITE_URL, name: "هدومي", inLanguage: "ar", publisher: { "@id": SITE_URL + "/#org" },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: SITE_URL + "/shop?q={search_term_string}" }, "query-input": "required name=search_term_string" } },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = (await api<NavData>("/api/nav").catch(() => null)) ?? { cats: [], brands: [] };
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd data={SITE_LD} />
        <StoreProvider>
          <Header nav={nav} />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
