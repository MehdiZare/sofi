"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/aceternity/card-3d";
import MovingBorder from "@/components/aceternity/moving-border";
import CloudflareHoverPlayer, { type CloudflareHoverPlayerHandle } from "@/components/shared/CloudflareHoverPlayer";
import SectionHeader from "@/components/ui/section-header";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { getLocalizedClassGroups } from "@/lib/classes";
import { SECTION_IDS, type LandingContent } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { withHiddenCloudflareControls } from "@/lib/video";

type ConceptProps = {
  locale: Locale;
  content: LandingContent;
};

function getViewAllLabel(locale: Locale): string {
  switch (locale) {
    case "hy":
      return "Բոլոր դասերը";
    case "ru":
      return "Все классы";
    case "en":
    default:
      return "View all classes";
  }
}

function getDurationLabel(locale: Locale, minutes: number): string {
  switch (locale) {
    case "hy":
      return `${minutes} րոպե`;
    case "ru":
      return `${minutes} мин`;
    case "en":
    default:
      return `${minutes} min`;
  }
}

export default function Concept({ locale, content }: ConceptProps) {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const cloudflarePlayerRefs = useRef<Record<string, CloudflareHoverPlayerHandle | null>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const classGroups = useMemo(() => getLocalizedClassGroups(locale), [locale]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const playVideo = (cardKey: string) => {
    const cloudflarePlayer = cloudflarePlayerRefs.current[cardKey];
    if (cloudflarePlayer) {
      cloudflarePlayer.play();
      return;
    }

    const video = videoRefs.current[cardKey];
    if (!video) {
      return;
    }

    void video.play().catch(() => {
      // Ignore autoplay promise errors if browser policy blocks immediate playback.
    });
  };

  const pauseVideo = (cardKey: string) => {
    const cloudflarePlayer = cloudflarePlayerRefs.current[cardKey];
    if (cloudflarePlayer) {
      cloudflarePlayer.pauseAndReset();
      return;
    }

    const video = videoRefs.current[cardKey];
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  };

  return (
    <section id={SECTION_IDS.concept} data-track-section={SECTION_IDS.concept} className="section-shell py-24 md:py-32">
      <SectionHeader badge={content.classFormatsBadge} title={content.conceptTitle} description={content.conceptIntro} />

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
        {content.classCards.map((card, index) => {
          const cardKey = String(index);
          const hasVideo = Boolean(card.videoSrc);
          const hasCloudflareStream = Boolean(card.streamId && card.iframeSrc);
          const supportsHoverPlayback = !prefersReducedMotion && (hasCloudflareStream || hasVideo);
          const hasIframe = Boolean(card.iframeSrc);
          const cloudflareIframeSrc = card.iframeSrc;
          const iframeSrcWithHiddenControls = withHiddenCloudflareControls(card.iframeSrc);
          const group = classGroups.find((item) => item.slug === card.groupSlug);
          const mediaPreview = prefersReducedMotion || (!hasVideo && !hasIframe)
            ? (
                <Image
                  src={card.image}
                  alt={`${card.title} class`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover"
                />
              )
            : hasCloudflareStream && cloudflareIframeSrc
              ? (
                  <CloudflareHoverPlayer
                    ref={(player) => {
                      cloudflarePlayerRefs.current[cardKey] = player;
                    }}
                    iframeSrc={cloudflareIframeSrc}
                    title={`${card.title} class preview`}
                    className="absolute inset-0 h-full w-full border-0"
                  />
                )
            : hasVideo
              ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={card.image}
                    aria-label={`${card.title} class preview`}
                    ref={(el) => {
                      videoRefs.current[cardKey] = el;
                    }}
                  >
                    <source src={card.videoSrc} type="video/mp4" />
                  </video>
                )
              : (
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
                    <CardItem>
                      <div
                        className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10"
                        onMouseEnter={supportsHoverPlayback ? () => playVideo(cardKey) : undefined}
                        onMouseLeave={supportsHoverPlayback ? () => pauseVideo(cardKey) : undefined}
                      >
                        {mediaPreview}
                      </div>
                    </CardItem>

                    <Badge className="mb-3">{card.title}</Badge>
                    <CardTitle>{card.tagline}</CardTitle>
                    <CardDescription className="mt-3 text-base">{card.description}</CardDescription>

                    {group ? (
                      <ul className="mt-5 space-y-2 text-sm text-text-muted">
                        {group.classes.map((fitnessClass) => (
                          <li key={fitnessClass.slug}>
                            <Link
                              href={`/${locale}/classes/${fitnessClass.slug}`}
                              className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 transition hover:border-accent-warm/70 hover:text-text"
                            >
                              <span>{fitnessClass.title}</span>
                              <span className="mono text-xs uppercase tracking-[0.12em] text-accent-warm">
                                {getDurationLabel(locale, fitnessClass.durationMinutes)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <Link
                      href={`/${locale}/classes`}
                      className="mono mt-5 inline-flex text-xs uppercase tracking-[0.12em] text-accent-warm hover:text-text"
                    >
                      {getViewAllLabel(locale)}
                    </Link>
                  </article>
                </MovingBorder>
              </CardBody>
            </CardContainer>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-5xl text-pretty text-center text-lg text-text-muted">
        {content.conceptStoryParagraph}
      </p>
    </section>
  );
}
