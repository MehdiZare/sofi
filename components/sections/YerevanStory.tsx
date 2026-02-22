"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StickyScrollReveal from "@/components/aceternity/sticky-scroll-reveal";
import BackgroundVideo from "@/components/shared/BackgroundVideo";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type YerevanStoryProps = {
  content: LandingContent;
};

export default function YerevanStory({ content }: YerevanStoryProps) {
  const yerevanStoryCloudflareIframeSrc =
    process.env.NEXT_PUBLIC_CLOUDFLARE_YEREVAN_STORY_IFRAME_URL ??
    "https://customer-bvw30n7zlfevs367.cloudflarestream.com/597e3a7394521edbd9b067a34c6de54d/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-bvw30n7zlfevs367.cloudflarestream.com%2F597e3a7394521edbd9b067a34c6de54d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600";
  const yerevanStoryMobileCloudflareIframeSrc =
    process.env.NEXT_PUBLIC_CLOUDFLARE_YEREVAN_STORY_MOBILE_IFRAME_URL;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Video fades in as section enters, fades out as it leaves
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  // Overlay gets darker as you scroll through (better text readability)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 0.45, 0.65, 0.8]);

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.yerevanStory}
      data-track-section={SECTION_IDS.yerevanStory}
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
          <BackgroundVideo
            posterSrc="/images/gallery/fitness-5.jpg"
            desktopIframeSrc={yerevanStoryCloudflareIframeSrc}
            mobileIframeSrc={yerevanStoryMobileCloudflareIframeSrc}
            mobileCover
            className="absolute inset-0"
          />
        </motion.div>
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </div>

      <div className="section-shell relative z-10">
        <StickyScrollReveal className="mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="mono text-xs uppercase tracking-[0.2em] text-accent-warm">{content.yerevanBadge}</p>
            <h2 className="text-balance text-4xl font-extrabold md:text-5xl">{content.yerevanTitle}</h2>
            <p className="max-w-xl text-lg text-text-muted">{content.yerevanBody}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {content.yerevanStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur">
                <p className="text-3xl font-extrabold text-accent-warm">{item.value}</p>
                <p className="mt-1 text-sm text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </StickyScrollReveal>
      </div>
    </section>
  );
}
