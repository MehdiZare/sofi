import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { contentByLocale } from "@/lib/constants";
import { getClerkLocalization } from "@/lib/clerk-localization";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const content = contentByLocale[locale];

  const title = content.metaTitle;
  const description = content.metaDescription;
  const ogTitle = content.ogTitle;
  const ogDescription = content.ogDescription;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofia.fitness";

  return {
    title,
    description,
    keywords: [
      "yoga yerevan",
      "strength training yerevan",
      "mobility recovery yerevan",
      "fitness yerevan",
      "expat fitness armenia",
      "hot yoga armenia",
      "boutique fitness yerevan"
    ],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `${baseUrl}/${locale}`,
      locale: locale === "en" ? "en_US" : locale === "hy" ? "hy_AM" : "ru_RU",
      type: "website",
      images: [
        {
          url: "/images/og-image.svg",
          width: 1200,
          height: 630,
          alt: content.siteName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/images/og-image.svg"]
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        hy: `${baseUrl}/hy`,
        ru: `${baseUrl}/ru`
      }
    }
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <div data-locale={locale} className="bg-bg text-text">
      {children}
    </div>
  );

  if (!clerkPublishableKey) {
    return content;
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      localization={getClerkLocalization(locale)}
    >
      {content}
    </ClerkProvider>
  );
}
