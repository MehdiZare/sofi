import WaitlistCounter from "@/components/shared/WaitlistCounter";
import PricingCard from "@/components/ui/pricing-card";
import SectionHeader from "@/components/ui/section-header";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type PricingProps = {
  content: LandingContent;
  waitlistCount: number;
};

export default function Pricing({ content, waitlistCount }: PricingProps) {
  return (
    <section id={SECTION_IDS.pricing} data-track-section={SECTION_IDS.pricing} className="section-shell py-24 md:py-32">
      <SectionHeader badge={content.pricingBadge} title={content.pricingTitle} />

      <div className="mx-auto mb-8 w-fit rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-accent-warm">
        {content.spotsRemainingPrefix}{" "}
        <WaitlistCounter initialCount={waitlistCount} mode="spots" className="mx-1 text-base font-bold text-text" />
        {" "}{content.spotsRemainingSuffix}
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {content.pricingTiers.map((tier) => (
          <PricingCard
            key={tier.name}
            {...tier}
            regularPriceLabel={content.pricingLabels.regularPrice}
            commitmentLabel={content.pricingLabels.commitment}
            perksLabel={content.pricingLabels.perks}
            featuredLabel={content.pricingLabels.featured}
          />
        ))}
      </div>
    </section>
  );
}
