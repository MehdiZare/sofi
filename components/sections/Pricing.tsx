import PricingCard from "@/components/ui/pricing-card";
import SectionHeader from "@/components/ui/section-header";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type PricingProps = {
  content: LandingContent;
  locale: Locale;
};

export default function Pricing({ content, locale }: PricingProps) {
  return (
    <section id={SECTION_IDS.pricing} data-track-section={SECTION_IDS.pricing} className="section-shell py-24 md:py-32">
      <SectionHeader badge={content.pricingBadge} title={content.pricingTitle} />

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {content.pricingTiers.map((tier) => (
          <PricingCard
            key={tier.name}
            {...tier}
            regularPriceLabel={content.pricingLabels.regularPrice}
            commitmentLabel={content.pricingLabels.commitment}
            perksLabel={content.pricingLabels.perks}
            featuredLabel={content.pricingLabels.featured}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
