import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { classSlugOrder, getLocalizedClass, getLocalizedClassGroups, isClassSlug } from "@/lib/classes";
import { contentByLocale } from "@/lib/constants";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildBreadcrumbStructuredData, buildClassStructuredData } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";
import InnerNavigation from "@/components/shared/InnerNavigation";

type ClassDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

function getPageDescription(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Դասի մանրամասներ, օգուտներ և հոսքային տեսանյութ Sofi Fitness-ից։";
    case "ru":
      return "Подробности класса, преимущества и видео-превью Sofi Fitness.";
    case "en":
    default:
      return "Detailed class breakdown, benefits, and stream preview from Sofi Fitness.";
  }
}

function getBackToClassesLabel(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Վերադառնալ բոլոր դասերին";
    case "ru":
      return "Назад к каталогу занятий";
    case "en":
    default:
      return "Back to all classes";
  }
}

function getBenefitsLabel(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Օգուտներ";
    case "ru":
      return "Преимущества";
    case "en":
    default:
      return "Benefits";
  }
}

function getClassFacts(locale: Locale, durationMinutes: number, intensityLabel: string, heatLabel: string) {
  switch (locale) {
    case "hy":
      return {
        duration: `Տևողություն: ${durationMinutes} րոպե`,
        intensity: `Ինտենսիվություն: ${intensityLabel}`,
        heat: `Ջերմային ռեժիմ: ${heatLabel}`
      };
    case "ru":
      return {
        duration: `Длительность: ${durationMinutes} мин`,
        intensity: `Интенсивность: ${intensityLabel}`,
        heat: `Температура: ${heatLabel}`
      };
    case "en":
    default:
      return {
        duration: `Duration: ${durationMinutes} min`,
        intensity: `Intensity: ${intensityLabel}`,
        heat: `Heat: ${heatLabel}`
      };
  }
}

function buildLanguageAlternates(baseUrl: string, slug: string) {
  return {
    en: `${baseUrl}/en/classes/${slug}`,
    hy: `${baseUrl}/hy/classes/${slug}`,
    ru: `${baseUrl}/ru/classes/${slug}`
  };
}

export async function generateMetadata({ params }: ClassDetailPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);

  if (!isClassSlug(slug)) {
    return {
      title: "Class Not Found"
    };
  }

  const fitnessClass = getLocalizedClass(locale, slug);

  if (!fitnessClass) {
    return {
      title: "Class Not Found"
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const title = `${fitnessClass.title} | Sofi Fitness`;
  const description = `${fitnessClass.description} ${getPageDescription(locale)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/classes/${slug}`,
      languages: buildLanguageAlternates(baseUrl, slug)
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${baseUrl}/${locale}/classes/${slug}`,
      images: [{ url: fitnessClass.image }],
      locale: locale === "en" ? "en_US" : locale === "hy" ? "hy_AM" : "ru_RU"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fitnessClass.image]
    }
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) => classSlugOrder.map((slug) => ({ locale, slug })));
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);

  if (!isClassSlug(slug)) {
    notFound();
  }

  const fitnessClass = getLocalizedClass(locale, slug);

  if (!fitnessClass) {
    notFound();
  }

  const content = contentByLocale[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const facts = getClassFacts(locale, fitnessClass.durationMinutes, fitnessClass.intensityLabel, fitnessClass.heatLabel);
  const classGroups = getLocalizedClassGroups(locale);
  const currentGroup = classGroups.find((group) => group.slug === fitnessClass.groupSlug);
  const related = currentGroup?.classes.filter((candidate) => candidate.slug !== fitnessClass.slug).slice(0, 3) ?? [];

  const classSchemas = buildClassStructuredData(locale, baseUrl, fitnessClass);
  const breadcrumbSchema = buildBreadcrumbStructuredData([
    { name: content.siteName, url: `${baseUrl}/${locale}` },
    { name: content.navLabels.classes, url: `${baseUrl}/${locale}/classes` },
    { name: fitnessClass.title, url: `${baseUrl}/${locale}/classes/${fitnessClass.slug}` }
  ]);

  return (
    <>
      <InnerNavigation
        locale={locale}
        siteName={content.siteName}
        ctaLabel={content.heroCta}
        navLabels={content.navLabels}
        languageNames={content.languageNames}
        languageSelectorLabel={content.languageSelectorLabel}
      />
      <main className="mx-auto min-h-screen w-full max-w-5xl px-6 pb-20 pt-28 text-text">
        <Link href={`/${locale}/classes`} className="mono text-xs uppercase tracking-[0.14em] text-accent-warm hover:text-text">
          {getBackToClassesLabel(locale)}
        </Link>

        <article className="mt-6 space-y-8">
          <header className="space-y-4">
            <p className="mono text-xs uppercase tracking-[0.12em] text-accent-warm">{currentGroup?.title}</p>
            <h1 className="text-balance text-4xl font-extrabold">{fitnessClass.title}</h1>
            <p className="text-xl text-text-muted">{fitnessClass.subtitle}</p>
            <p className="text-text-muted">{fitnessClass.description}</p>
          </header>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-surface p-5 md:grid-cols-3">
            <p className="text-sm text-text-muted">{facts.duration}</p>
            <p className="text-sm text-text-muted">{facts.intensity}</p>
            <p className="text-sm text-text-muted">{facts.heat}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">{getBenefitsLabel(locale)}</h2>
            <ul className="space-y-3">
              {fitnessClass.benefits.map((benefit) => (
                <li key={benefit} className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-text-muted">
                  {benefit}
                </li>
              ))}
            </ul>
          </section>

          <section className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-black">
            {fitnessClass.iframeSrc ? (
              <iframe
                src={fitnessClass.iframeSrc}
                loading="lazy"
                title={`${fitnessClass.title} preview`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : fitnessClass.fallbackVideoSrc ? (
              <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster={fitnessClass.image}>
                <source src={fitnessClass.fallbackVideoSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={fitnessClass.image}
                alt={`${fitnessClass.title} class preview`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </section>

          {related.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">{currentGroup?.title}</h2>
              <ul className="grid gap-4 md:grid-cols-3">
                {related.map((candidate) => (
                  <li key={candidate.slug}>
                    <Link
                      href={`/${locale}/classes/${candidate.slug}`}
                      className="block h-full rounded-2xl border border-white/10 bg-surface p-4 transition hover:border-accent-warm/70"
                    >
                      <h3 className="font-semibold">{candidate.title}</h3>
                      <p className="mt-2 text-sm text-text-muted">{candidate.subtitle}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>

        {classSchemas.map((schema, index) => (
          <JsonLd key={index} id={`class-schema-${index}`} data={schema} />
        ))}
        <JsonLd id="class-breadcrumb-schema" data={breadcrumbSchema} />
      </main>
    </>
  );
}
