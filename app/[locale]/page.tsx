import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getLocalizedClassGroups } from "@/lib/classes";
import { contentByLocale, SECTION_IDS } from "@/lib/constants";
import { buildHomepageStructuredData } from "@/lib/seo";
import { defaultLocale, isLocale } from "@/lib/i18n";
import Navigation from "@/components/shared/Navigation";
import JsonLd from "@/components/shared/JsonLd";
import Hero from "@/components/sections/Hero";
import ReferralCapture from "@/components/shared/ReferralCapture";
import SectionViewTracker from "@/components/shared/SectionViewTracker";
import CookieConsent from "@/components/shared/CookieConsent";

const Concept = dynamic(() => import("@/components/sections/Concept"));
const YerevanStory = dynamic(() => import("@/components/sections/YerevanStory"));
const Founder = dynamic(() => import("@/components/sections/Founder"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const WaitlistSection = dynamic(() => import("@/components/sections/WaitlistSection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : defaultLocale;
  const content = contentByLocale[locale];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness";
  const classGroups = getLocalizedClassGroups(locale);

  const structuredData = buildHomepageStructuredData(
    locale,
    baseUrl,
    content.metaDescription,
    classGroups
  );

  return (
    <main className="relative min-h-screen bg-bg text-text">
      <Suspense fallback={null}>
        <ReferralCapture />
      </Suspense>
      <SectionViewTracker locale={locale} />
      <Navigation
        locale={locale}
        siteName={content.siteName}
        ctaLabel={content.heroCta}
        navLabels={content.navLabels}
        languageNames={content.languageNames}
        languageSelectorLabel={content.languageSelectorLabel}
      />

      <Hero content={content} />
      <Concept locale={locale} content={content} />
      <YerevanStory content={content} />
      <Founder content={content} />
      <Pricing content={content} locale={locale} />
      <SocialProof content={content} />
      <WaitlistSection content={content} />
      <Footer locale={locale} content={content} />
      <CookieConsent
        text={content.cookieBannerText}
        acceptLabel={content.cookieAcceptLabel}
        declineLabel={content.cookieDeclineLabel}
      />

      {structuredData.map((schema, index) => (
        <JsonLd key={index} id={`homepage-schema-${index}`} data={schema} />
      ))}

      <a
        href={`#${SECTION_IDS.waitlist}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2"
      >
        Skip to waitlist form
      </a>
    </main>
  );
}
