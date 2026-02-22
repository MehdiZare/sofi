import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioyerevan.com";

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.8,
    lastModified: new Date()
  }));
}
