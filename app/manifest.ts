import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return { name: `${SITE_NAME} — ملابس من أفضل البراندات المصرية`, short_name: SITE_NAME, lang: "ar", dir: "rtl", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#111111", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] };
}
