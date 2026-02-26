import Link from "next/link";
import type { Metadata } from "next";
import { getLocalizedClassGroups } from "@/lib/classes";
import { contentByLocale } from "@/lib/constants";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildBreadcrumbStructuredData, buildClassGroupItemListStructuredData } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";

type ClassesIndexPageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

function getPageTitle(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Դասերի ամբողջական ցուցակ";
    case "ru":
      return "Полный каталог занятий";
    case "en":
    default:
      return "Complete Class Catalog";
  }
}

function getPageDescription(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Բացահայտեք Sofi Fitness-ի բոլոր դասերը՝ ըստ ձևաչափի, ինտենսիվության և նպատակի։";
    case "ru":
      return "Изучите все форматы Sofi Fitness по направлению, интенсивности и цели.";
    case "en":
    default:
      return "Explore every Sofi Fitness class by format, intensity, and training goal.";
  }
}

function getBackLabel(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Վերադառնալ գլխավոր էջ";
    case "ru":
      return "Вернуться на главную";
    case "en":
    default:
      return "Back to home";
  }
}

function getDurationLabel(locale: Locale, minutes: number): string {
  switch (locale) {
    case "hy":
      return `${minutes} րոպե`;
    case "ru":
      return `${minutes} мин`;
    case "en":
    default:
      return `${minutes} min`;
  }
}

function buildLanguageAlternates(baseUrl: string, path: string) {
  return {
    en: `${baseUrl}/en${path}`,
    hy: `${baseUrl}/hy${path}`,
    ru: `${baseUrl}/ru${path}`
  };
}

export async function generateMetadata({ params }: ClassesIndexPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const title = getPageTitle(locale);
  const description = getPageDescription(locale);

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/classes`,
      languages: buildLanguageAlternates(baseUrl, "/classes")
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${baseUrl}/${locale}/classes`,
      locale: locale === "en" ? "en_US" : locale === "hy" ? "hy_AM" : "ru_RU"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ClassesIndexPage({ params }: ClassesIndexPageProps) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const content = contentByLocale[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const classGroups = getLocalizedClassGroups(locale);

  const classListSchema = buildClassGroupItemListStructuredData(locale, baseUrl, classGroups);
  const breadcrumbSchema = buildBreadcrumbStructuredData([
    { name: content.siteName, url: `${baseUrl}/${locale}` },
    { name: getPageTitle(locale), url: `${baseUrl}/${locale}/classes` }
  ]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-20 text-text">
      <Link href={`/${locale}`} className="mono text-xs uppercase tracking-[0.14em] text-accent-warm hover:text-text">
        {getBackLabel(locale)}
      </Link>

      <h1 className="mt-4 text-balance text-4xl font-extrabold">{getPageTitle(locale)}</h1>
      <p className="mt-4 max-w-3xl text-text-muted">{getPageDescription(locale)}</p>

      <div className="mt-12 space-y-10">
        {classGroups.map((group) => (
          <section key={group.slug} className="space-y-4">
            <header>
              <h2 className="text-2xl font-bold">{group.title}</h2>
              <p className="mt-1 text-text-muted">{group.description}</p>
            </header>

            <ul className="grid gap-4 md:grid-cols-2">
              {group.classes.map((fitnessClass) => (
                <li key={fitnessClass.slug}>
                  <Link
                    href={`/${locale}/classes/${fitnessClass.slug}`}
                    className="block rounded-2xl border border-white/10 bg-surface p-5 transition hover:border-accent-warm/70"
                  >
                    <p className="mono text-xs uppercase tracking-[0.12em] text-accent-warm">
                      {getDurationLabel(locale, fitnessClass.durationMinutes)} · {fitnessClass.intensityLabel}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{fitnessClass.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{fitnessClass.subtitle}</p>
                    <p className="mt-3 text-sm text-text-muted">{fitnessClass.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <JsonLd id="classes-list-schema" data={classListSchema} />
      <JsonLd id="classes-list-breadcrumb-schema" data={breadcrumbSchema} />
    </main>
  );
}
