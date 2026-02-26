import type { Locale } from "@/lib/i18n";
import type { LocalizedClass, LocalizedClassGroup } from "@/lib/classes";

function localeToLanguageTag(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "hy-AM";
    case "ru":
      return "ru-RU";
    case "en":
    default:
      return "en-US";
  }
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildOrganizationStructuredData(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sofi Fitness",
    url: baseUrl,
    sameAs: [
      "https://instagram.com/studioyerevan",
      "https://facebook.com/studioyerevan",
      "https://t.me/studioyerevan"
    ]
  };
}

export function buildHealthClubStructuredData(
  locale: Locale,
  baseUrl: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: "Sofi Fitness",
    description,
    inLanguage: localeToLanguageTag(locale),
    areaServed: "Yerevan, Armenia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yerevan",
      addressCountry: "AM"
    },
    url: `${baseUrl}/${locale}`,
    sameAs: [
      "https://instagram.com/studioyerevan",
      "https://facebook.com/studioyerevan",
      "https://t.me/studioyerevan"
    ]
  };
}

export function buildClassGroupItemListStructuredData(
  locale: Locale,
  baseUrl: string,
  groups: readonly LocalizedClassGroup[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Class Formats",
    inLanguage: localeToLanguageTag(locale),
    itemListElement: groups.map((group, groupIndex) => ({
      "@type": "ListItem",
      position: groupIndex + 1,
      name: group.title,
      item: {
        "@type": "ItemList",
        name: group.title,
        numberOfItems: group.classes.length,
        itemListElement: group.classes.map((fitnessClass, classIndex) => ({
          "@type": "ListItem",
          position: classIndex + 1,
          name: fitnessClass.title,
          url: `${baseUrl}/${locale}/classes/${fitnessClass.slug}`
        }))
      }
    }))
  };
}

export function buildHomepageStructuredData(
  locale: Locale,
  baseUrl: string,
  description: string,
  groups: readonly LocalizedClassGroup[]
) {
  return [
    buildOrganizationStructuredData(baseUrl),
    buildHealthClubStructuredData(locale, baseUrl, description),
    buildClassGroupItemListStructuredData(locale, baseUrl, groups)
  ];
}

export function buildBreadcrumbStructuredData(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function buildClassStructuredData(
  locale: Locale,
  baseUrl: string,
  fitnessClass: LocalizedClass
): Record<string, unknown>[] {
  const classUrl = `${baseUrl}/${locale}/classes/${fitnessClass.slug}`;
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "ExercisePlan",
      name: fitnessClass.title,
      description: fitnessClass.description,
      inLanguage: localeToLanguageTag(locale),
      url: classUrl,
      exerciseType: fitnessClass.groupSlug,
      activityFrequency: "P1W",
      timeRequired: `PT${fitnessClass.durationMinutes}M`,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Heat",
          value: fitnessClass.heatLabel
        },
        {
          "@type": "PropertyValue",
          name: "Intensity",
          value: fitnessClass.intensityLabel
        }
      ],
      provider: {
        "@type": "HealthClub",
        name: "Sofi Fitness",
        url: `${baseUrl}/${locale}`
      }
    }
  ];

  if (fitnessClass.iframeSrc) {
    const videoSchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${fitnessClass.title} Preview`,
      description: fitnessClass.description,
      inLanguage: localeToLanguageTag(locale),
      embedUrl: fitnessClass.iframeSrc,
      about: {
        "@type": "Thing",
        name: fitnessClass.title
      }
    };

    if (fitnessClass.streamId) {
      const cloudflareHost =
        process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim() ||
        process.env.NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim() ||
        "customer-bvw30n7zlfevs367.cloudflarestream.com";

      const normalizedHost = cloudflareHost.endsWith(".cloudflarestream.com")
        ? cloudflareHost
        : `${cloudflareHost}.cloudflarestream.com`;

      videoSchema.thumbnailUrl = `https://${normalizedHost}/${fitnessClass.streamId}/thumbnails/thumbnail.jpg?time=&height=600`;
      videoSchema.contentUrl = `https://${normalizedHost}/${fitnessClass.streamId}/manifest/video.m3u8`;
    }

    schemas.push(videoSchema);
  }

  return schemas;
}

export function buildLegalPageStructuredData(
  locale: Locale,
  title: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    inLanguage: localeToLanguageTag(locale),
    url
  };
}
