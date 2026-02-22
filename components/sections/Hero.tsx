import BackgroundBeams from "@/components/aceternity/background-beams";
import TextGenerateEffect from "@/components/aceternity/text-generate-effect";
import BackgroundVideo from "@/components/shared/BackgroundVideo";
import ScrollIndicator from "@/components/shared/ScrollIndicator";
import WaitlistCounter from "@/components/shared/WaitlistCounter";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type HeroProps = {
  content: LandingContent;
  waitlistCount: number;
};

export default function Hero({ content, waitlistCount }: HeroProps) {
  const videoCdn = process.env.NEXT_PUBLIC_VIDEO_CDN_URL;
  const desktopVideoSrc = videoCdn ? `${videoCdn}/hero-desktop.mp4` : "/videos/hero-desktop.mp4";
  const mobileVideoSrc = videoCdn ? `${videoCdn}/hero-mobile.mp4` : "/videos/hero-mobile.mp4";

  return (
    <section
      id={SECTION_IDS.hero}
      data-track-section={SECTION_IDS.hero}
      className="section-shell relative flex min-h-screen items-center justify-center pt-20"
    >
      <BackgroundVideo
        className="absolute inset-0"
        posterSrc="/images/placeholders/hero-poster.svg"
        desktopSrc={desktopVideoSrc}
        mobileSrc={mobileVideoSrc}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-bg" />
      <BackgroundBeams className="opacity-85" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <Badge className="mb-6 border-accent-warm/40 bg-black/30 text-accent-warm">
          <TextGenerateEffect words={content.badge} />
        </Badge>

        <h1 className="text-balance text-5xl font-black md:text-7xl">{content.heroHeadline}</h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-text md:text-xl">{content.heroSubheadline}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={`#${SECTION_IDS.waitlist}`}>
            <Button size="xl">{content.heroCta}</Button>
          </a>

          <div className="rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-text-muted backdrop-blur">
            <WaitlistCounter initialCount={waitlistCount} className="mr-1 text-lg font-semibold text-text" />
            people on the waitlist
          </div>
        </div>

        <div className="mt-16">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
