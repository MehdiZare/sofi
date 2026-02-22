import Image from "next/image";
import InfiniteMovingCards from "@/components/aceternity/infinite-moving-cards";
import SectionHeader from "@/components/ui/section-header";
import { founderCredentials, SECTION_IDS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type FounderProps = {
  locale: Locale;
};

export default function Founder({}: FounderProps) {
  return (
    <section id={SECTION_IDS.founder} data-track-section={SECTION_IDS.founder} className="section-shell py-24 md:py-32">
      <SectionHeader badge="Founder" title="Meet the Founder" />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/placeholders/founder.svg"
            alt="Founder portrait"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-bold">[Name], Founder & Lead Instructor</h3>
          <p className="text-lg leading-relaxed text-text-muted">
            With a physical education background and years coaching in English, she is building the studio she always
            wished existed in Yerevan: premium formats, warm community, and global standards.
          </p>

          <InfiniteMovingCards className="py-2">
            {founderCredentials.map((credential) => (
              <div
                key={credential}
                className="mono rounded-full border border-white/15 bg-surface-elevated px-4 py-2 text-xs uppercase tracking-[0.12em] text-accent-warm"
              >
                {credential}
              </div>
            ))}
          </InfiniteMovingCards>

          <blockquote className="border-l-2 border-primary pl-4 text-xl italic text-text">
            &ldquo;I&apos;ve spent my career helping people move better. Yerevan deserves a studio that matches its
            energy.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
