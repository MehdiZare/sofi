import Link from "next/link";
import { contentByLocale } from "@/lib/constants";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { legalContentByLocale } from "@/lib/legal";

type LocalePrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePrivacyPage({ params }: LocalePrivacyPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const content = contentByLocale[locale];
  const legalContent = legalContentByLocale[locale];

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-24 text-text">
      <Link href={`/${locale}`} className="mono text-xs uppercase tracking-[0.14em] text-accent-warm hover:text-text">
        {content.siteName}
      </Link>
      <h1 className="mt-4 text-balance text-4xl font-extrabold">{legalContent.privacyTitle}</h1>
      <p className="mt-3 text-sm text-text-muted">{legalContent.privacyUpdatedAt}</p>

      <div className="mt-10 space-y-8">
        {legalContent.privacySections.map((section) => (
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
    </main>
  );
}
