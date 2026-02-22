import BackgroundBeams from "@/components/aceternity/background-beams";
import Vortex from "@/components/aceternity/vortex";
import WaitlistCounter from "@/components/shared/WaitlistCounter";
import WaitlistForm from "@/components/shared/WaitlistForm";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type WaitlistSectionProps = {
  content: LandingContent;
  waitlistCount: number;
};

export default function WaitlistSection({ content, waitlistCount }: WaitlistSectionProps) {
  return (
    <section
      id={SECTION_IDS.waitlist}
      data-track-section={SECTION_IDS.waitlist}
      className="section-shell relative py-24 md:py-32"
    >
      <Vortex className="mx-auto max-w-5xl border border-white/10 bg-surface/50 px-6 py-14 md:px-12">
        <BackgroundBeams />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-[0.18em] text-accent-warm">Primary Conversion</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold md:text-5xl">{content.waitlistTitle}</h2>
          <p className="mt-4 text-pretty text-lg text-text-muted">{content.waitlistSubtitle}</p>

          <div className="mt-10">
            <WaitlistForm />
          </div>

          <p className="mt-6 text-sm text-text-muted">
            Already
            <WaitlistCounter initialCount={waitlistCount} className="mx-1 text-base font-semibold text-text" />
            people on the waitlist
          </p>

          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-accent-warm">
            Share with friends after sign-up to move up the list.
          </p>
        </div>
      </Vortex>
    </section>
  );
}
