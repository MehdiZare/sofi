import InfiniteMovingCards from "@/components/aceternity/infinite-moving-cards";
import LayoutGrid from "@/components/aceternity/layout-grid";
import TestimonialCard from "@/components/ui/testimonial-card";
import SectionHeader from "@/components/ui/section-header";
import { SECTION_IDS, testimonials } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type SocialProofProps = {
  locale: Locale;
};

const images = [
  "/images/placeholders/community-1.svg",
  "/images/placeholders/community-2.svg",
  "/images/placeholders/community-3.svg",
  "/images/placeholders/community-4.svg",
  "/images/placeholders/community-5.svg",
  "/images/placeholders/community-6.svg"
];

export default function SocialProof({}: SocialProofProps) {
  return (
    <section
      id={SECTION_IDS.socialProof}
      data-track-section={SECTION_IDS.socialProof}
      className="section-shell py-24 md:py-32"
    >
      <SectionHeader badge="Social Proof" title="Community in Motion" />

      <div className="mx-auto max-w-7xl space-y-10">
        <LayoutGrid items={images.map((src) => ({ src, alt: "Studio community moment" }))} />

        <InfiniteMovingCards>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-${testimonial.quote.slice(0, 10)}`}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </InfiniteMovingCards>

        <a
          href="https://instagram.com/studioyerevan"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-white/15 px-5 py-2 text-sm text-text-muted transition hover:border-white/35 hover:text-text"
        >
          Follow our journey @studioyerevan
        </a>
      </div>
    </section>
  );
}
