import type { Metadata } from "next";
import { contentByLocale } from "@/lib/constants";
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

  const title = `${content.siteName} — Hot Yoga, Barre & Pilates in Yerevan`;
  const description =
    "Yerevan's first English-friendly boutique fitness studio. Hot yoga, barre, and Pilates reformer classes in Kentron. Join the waitlist for founding member pricing.";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioyerevan.com";

  return {
    title,
    description,
    keywords: [
      "yoga yerevan",
      "pilates yerevan",
      "barre yerevan",
      "fitness yerevan",
      "expat fitness armenia",
      "hot yoga armenia",
      "boutique fitness yerevan"
    ],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      locale: locale === "en" ? "en_US" : locale === "hy" ? "hy_AM" : "ru_RU",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Studio Yerevan"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"]
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

  return (
    <div data-locale={locale} className="bg-bg text-text">
      {children}
    </div>
  );
}
