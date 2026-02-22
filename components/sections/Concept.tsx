"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/card-3d";
import MovingBorder from "@/components/aceternity/moving-border";
import SectionHeader from "@/components/ui/section-header";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";
import { withHiddenCloudflareControls } from "@/lib/video";

type ConceptProps = {
  content: LandingContent;
};

export default function Concept({ content }: ConceptProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section id={SECTION_IDS.concept} data-track-section={SECTION_IDS.concept} className="section-shell py-24 md:py-32">
      <SectionHeader badge={content.classFormatsBadge} title={content.conceptTitle} description={content.conceptIntro} />

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {content.classCards.map((card) => {
          const hasIframe = Boolean(card.iframeSrc);
          const iframeSrcWithHiddenControls = withHiddenCloudflareControls(card.iframeSrc);
          const mediaPreview = prefersReducedMotion || !hasIframe ? (
            <Image
              src={card.image}
              alt={`${card.title} class`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <iframe
              src={iframeSrcWithHiddenControls}
              loading="lazy"
              title={`${card.title} class preview`}
              allow="autoplay; encrypted-media;"
              className="absolute inset-0 h-full w-full border-0"
            />
          );

          return (
            <CardContainer key={card.title}>
              <CardBody>
                <MovingBorder className="h-full p-1">
                  <article className="h-full rounded-[calc(1.5rem-4px)] bg-surface p-6">
                    <CardItem className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                      {mediaPreview}
                    </CardItem>

                    <Badge className="mb-3">{card.title}</Badge>
                    <CardTitle>{card.tagline}</CardTitle>
                    <CardDescription className="mt-3 text-base">{card.description}</CardDescription>
                  </article>
                </MovingBorder>
              </CardBody>
            </CardContainer>
          );
        })}
      </div>
    </section>
  );
}
