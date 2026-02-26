import Link from "next/link";
import type { Metadata } from "next";
import { contentByLocale } from "@/lib/constants";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { legalContentByLocale } from "@/lib/legal";
import { buildLegalPageStructuredData } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";

type LocaleTermsPageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

function buildLanguageAlternates(baseUrl: string, path: string) {
  return {
    en: `${baseUrl}/en${path}`,
    hy: `${baseUrl}/hy${path}`,
    ru: `${baseUrl}/ru${path}`
  };
}

export async function generateMetadata({ params }: LocaleTermsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const legalContent = legalContentByLocale[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const title = `${legalContent.termsTitle} | Sofi Fitness`;
  const description = legalContent.termsSections[0]?.body[0] ?? legalContent.termsTitle;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: buildLanguageAlternates(baseUrl, "/terms")
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${baseUrl}/${locale}/terms`
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export default async function LocaleTermsPage({ params }: LocaleTermsPageProps) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const content = contentByLocale[locale];
  const legalContent = legalContentByLocale[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";

  const schema = buildLegalPageStructuredData(
    locale,
    legalContent.termsTitle,
    legalContent.termsSections[0]?.body[0] ?? legalContent.termsTitle,
    `${baseUrl}/${locale}/terms`
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-24 text-text">
      <Link href={`/${locale}`} className="mono text-xs uppercase tracking-[0.14em] text-accent-warm hover:text-text">
        {content.siteName}
      </Link>
      <h1 className="mt-4 text-balance text-4xl font-extrabold">{legalContent.termsTitle}</h1>
      <p className="mt-3 text-sm text-text-muted">{legalContent.termsUpdatedAt}</p>

      <div className="mt-10 space-y-8">
        {legalContent.termsSections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <JsonLd id="terms-schema" data={schema} />
    </main>
  );
}
