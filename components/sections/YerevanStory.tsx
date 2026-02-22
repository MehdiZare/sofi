import StickyScrollReveal from "@/components/aceternity/sticky-scroll-reveal";
import { SECTION_IDS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type YerevanStoryProps = {
  locale: Locale;
};

const stats = [
  { value: "70,000+", label: "Expats in Armenia" },
  { value: "0", label: "Hot yoga studios in Yerevan" },
  { value: "1", label: "Studio launching soon" }
];

export default function YerevanStory({}: YerevanStoryProps) {
  return (
    <section
      id={SECTION_IDS.yerevanStory}
      data-track-section={SECTION_IDS.yerevanStory}
      className="section-shell relative py-24 md:py-32"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/placeholders/yerevan-panorama.svg')"
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <StickyScrollReveal className="relative mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="mono text-xs uppercase tracking-[0.2em] text-accent-warm">The Yerevan Story</p>
          <h2 className="text-balance text-4xl font-extrabold md:text-5xl">Born in Yerevan. Made for the World.</h2>
          <p className="max-w-xl text-lg text-text-muted">
            Yerevan is having a moment. A creative, international community is growing in one of the world&apos;s
            oldest cities. We&apos;re here to move with it.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur">
              <p className="text-3xl font-extrabold text-accent-warm">{item.value}</p>
              <p className="mt-1 text-sm text-text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </StickyScrollReveal>
    </section>
  );
}
