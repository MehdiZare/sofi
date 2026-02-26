import Image from "next/image";
import InfiniteMovingCards from "@/components/aceternity/infinite-moving-cards";
import SectionHeader from "@/components/ui/section-header";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type FounderProps = {
  content: LandingContent;
};

export default function Founder({ content }: FounderProps) {
  return (
    <section id={SECTION_IDS.founder} data-track-section={SECTION_IDS.founder} className="section-shell py-24 md:py-32">
      <SectionHeader badge={content.founderBadge} title={content.founderTitle} />

      <div className="mx-auto max-w-4xl space-y-6">
        <h3 className="text-3xl font-bold">{content.founderName}</h3>
        <p className="text-lg leading-relaxed text-text-muted">{content.founderBio}</p>

        <InfiniteMovingCards className="py-2">
          {content.founderCredentials.map((credential) => (
            <div
              key={credential}
              className="mono rounded-full border border-white/15 bg-surface-elevated px-4 py-2 text-xs uppercase tracking-[0.12em] text-accent-warm"
            >
              {credential}
            </div>
          ))}
        </InfiniteMovingCards>

        <blockquote className="border-l-2 border-primary pl-4 text-xl italic text-text">&ldquo;{content.founderQuote}&rdquo;</blockquote>

        <div className="grid grid-cols-3 gap-3">
          {content.founderGallery.map((galleryImage) => (
            <div key={galleryImage.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={galleryImage.src}
                alt={galleryImage.alt}
                fill
                sizes="(max-width: 768px) 30vw, (max-width: 1024px) 20vw, 12vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
