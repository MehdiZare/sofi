import dynamic from "next/dynamic";
import { Suspense } from "react";
import { contentByLocale, SECTION_IDS } from "@/lib/constants";
import { buildLocalBusinessStructuredData } from "@/lib/seo";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getWaitlistStats } from "@/lib/waitlist";
import Navigation from "@/components/shared/Navigation";
import Hero from "@/components/sections/Hero";
import ReferralCapture from "@/components/shared/ReferralCapture";
import SectionViewTracker from "@/components/shared/SectionViewTracker";

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
  const waitlistStats = await getWaitlistStats();

  const structuredData = buildLocalBusinessStructuredData(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioyerevan.com"
  );

  return (
    <main className="relative min-h-screen bg-bg text-text">
      <Suspense fallback={null}>
        <ReferralCapture />
      </Suspense>
      <SectionViewTracker locale={locale} />
      <Navigation ctaLabel={content.heroCta} />

      <Hero content={content} waitlistCount={waitlistStats.count} />
      <Concept locale={locale} />
      <YerevanStory locale={locale} />
      <Founder locale={locale} />
      <Pricing waitlistCount={waitlistStats.count} />
      <SocialProof locale={locale} />
      <WaitlistSection content={content} waitlistCount={waitlistStats.count} />
      <Footer content={content} />

      <script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a
        href={`#${SECTION_IDS.waitlist}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2"
      >
        Skip to waitlist form
      </a>
    </main>
  );
}
