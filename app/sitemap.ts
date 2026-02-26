import type { MetadataRoute } from "next";
import { classSlugOrder } from "@/lib/classes";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const now = new Date();

  return locales.flatMap((locale) => {
    const localeBase = `${baseUrl}/${locale}`;

    const coreRoutes: MetadataRoute.Sitemap = [
      {
        url: localeBase,
        changeFrequency: "weekly",
        priority: locale === "en" ? 1 : 0.9,
        lastModified: now
      },
      {
        url: `${localeBase}/classes`,
        changeFrequency: "weekly",
        priority: locale === "en" ? 0.9 : 0.8,
        lastModified: now
      },
      {
        url: `${localeBase}/privacy`,
        changeFrequency: "monthly",
        priority: 0.3,
        lastModified: now
      },
      {
        url: `${localeBase}/terms`,
        changeFrequency: "monthly",
        priority: 0.3,
        lastModified: now
      }
    ];

    const classRoutes: MetadataRoute.Sitemap = classSlugOrder.map((slug) => ({
      url: `${localeBase}/classes/${slug}`,
      changeFrequency: "weekly",
      priority: locale === "en" ? 0.8 : 0.7,
      lastModified: now
    }));

    return [...coreRoutes, ...classRoutes];
  });
}
