import WaitlistCounter from "@/components/shared/WaitlistCounter";
import PricingCard from "@/components/ui/pricing-card";
import SectionHeader from "@/components/ui/section-header";
import { pricingTiers, SECTION_IDS } from "@/lib/constants";

type PricingProps = {
  waitlistCount: number;
};

export default function Pricing({ waitlistCount }: PricingProps) {
  return (
    <section id={SECTION_IDS.pricing} data-track-section={SECTION_IDS.pricing} className="section-shell py-24 md:py-32">
      <SectionHeader badge="Founding Rates" title="Founding Member Pricing" />

      <div className="mx-auto mb-8 w-fit rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-accent-warm">
        Only <WaitlistCounter initialCount={waitlistCount} mode="spots" className="mx-1 text-base font-bold text-text" />
        founding spots remaining
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.name} {...tier} />
        ))}
      </div>
    </section>
  );
}
