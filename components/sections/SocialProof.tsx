import InfiniteMovingCards from "@/components/aceternity/infinite-moving-cards";
import LayoutGrid from "@/components/aceternity/layout-grid";
import TestimonialCard from "@/components/ui/testimonial-card";
import SectionHeader from "@/components/ui/section-header";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type SocialProofProps = {
  content: LandingContent;
};

const images = [
  "/images/gallery/fitness-1.jpg",
  "/images/gallery/fitness-2.jpg",
  "/images/gallery/fitness-3.jpg",
  "/images/gallery/fitness-4.jpg",
  "/images/gallery/fitness-5.jpg",
  "/images/gallery/fitness-6.jpg",
  "/images/gallery/fitness-7.jpg",
  "/images/gallery/fitness-8.jpg",
  "/images/gallery/fitness-9.jpg"
];

export default function SocialProof({ content }: SocialProofProps) {
  return (
    <section
      id={SECTION_IDS.socialProof}
      data-track-section={SECTION_IDS.socialProof}
      className="section-shell py-24 md:py-32"
    >
      <SectionHeader badge={content.socialBadge} title={content.socialTitle} />

      <div className="mx-auto max-w-7xl space-y-10">
        <LayoutGrid items={images.map((src) => ({ src, alt: content.socialGridImageAlt }))} />

        <InfiniteMovingCards>
          {content.testimonials.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.author}-${testimonial.quote.slice(0, 10)}`}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </InfiniteMovingCards>

        <a
          href={content.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-white/15 px-5 py-2 text-sm text-text-muted transition hover:border-white/35 hover:text-text"
        >
          {content.socialFollowLabel}
        </a>
      </div>
    </section>
  );
}
