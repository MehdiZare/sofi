"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import BackgroundBeams from "@/components/aceternity/background-beams";
import TextGenerateEffect from "@/components/aceternity/text-generate-effect";
import BackgroundVideo from "@/components/shared/BackgroundVideo";
import ScrollIndicator from "@/components/shared/ScrollIndicator";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";

type HeroProps = {
  content: LandingContent;
};

export default function Hero({ content }: HeroProps) {
  const desktopCloudflareIframeSrc =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HERO_DESKTOP_IFRAME_URL ??
    "https://customer-bvw30n7zlfevs367.cloudflarestream.com/65929572aefd9680dbee8d0210b37839/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-bvw30n7zlfevs367.cloudflarestream.com%2F65929572aefd9680dbee8d0210b37839%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600";
  const mobileCloudflareIframeSrc =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HERO_MOBILE_IFRAME_URL ??
    "https://customer-bvw30n7zlfevs367.cloudflarestream.com/8c1960ea376d832a7b8cace716aa32ae/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-bvw30n7zlfevs367.cloudflarestream.com%2F8c1960ea376d832a7b8cace716aa32ae%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600";

  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.15]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      data-track-section={SECTION_IDS.hero}
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden pb-10 pt-16 md:min-h-screen md:pb-0 md:pt-20"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          opacity: prefersReducedMotion ? 1 : videoOpacity,
          y: prefersReducedMotion ? 0 : videoY,
          scale: prefersReducedMotion ? 1 : videoScale,
        }}
      >
        <BackgroundVideo
          className="absolute inset-0"
          posterSrc="/images/gallery/fitness-1.jpg"
          desktopIframeSrc={desktopCloudflareIframeSrc}
          mobileIframeSrc={mobileCloudflareIframeSrc}
          posterPriority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-bg" />
      </motion.div>
      <BackgroundBeams className="opacity-85" />

      <div className="section-shell relative z-10 w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Badge className="mb-6 border-accent-warm/40 bg-black/30 text-accent-warm">
            <TextGenerateEffect words={content.badge} />
          </Badge>

          <h1 className="text-balance text-4xl font-black md:text-7xl">{content.heroHeadline}</h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg text-text md:text-xl">{content.heroSubheadline}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={`#${SECTION_IDS.waitlist}`}>
              <Button size="xl">{content.heroCta}</Button>
            </a>
          </div>

          <div className="mt-10 md:mt-16">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
}
