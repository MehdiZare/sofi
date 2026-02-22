import BackgroundBeams from "@/components/aceternity/background-beams";
import Vortex from "@/components/aceternity/vortex";
import WaitlistForm from "@/components/shared/WaitlistForm";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type WaitlistSectionProps = {
  content: LandingContent;
};

export default function WaitlistSection({ content }: WaitlistSectionProps) {
  return (
    <section
      id={SECTION_IDS.waitlist}
      data-track-section={SECTION_IDS.waitlist}
      className="section-shell relative py-24 md:py-32"
    >
      <Vortex className="mx-auto max-w-5xl border border-white/10 bg-surface/50 px-6 py-14 md:px-12">
        <BackgroundBeams />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-[0.18em] text-accent-warm">{content.waitlistEyebrow}</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold md:text-5xl">{content.waitlistTitle}</h2>
          <p className="mt-4 text-pretty text-lg text-text-muted">{content.waitlistSubtitle}</p>

          <div className="mt-10">
            <WaitlistForm />
          </div>
        </div>
      </Vortex>
    </section>
  );
}
