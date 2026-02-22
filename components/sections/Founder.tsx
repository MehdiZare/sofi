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

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/gallery/fitness-6.jpg"
            alt="Founder portrait"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        <div className="space-y-6">
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
        </div>
      </div>
    </section>
  );
}
