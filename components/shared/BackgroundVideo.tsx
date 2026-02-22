"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { withHiddenCloudflareControls } from "@/lib/video";

type BackgroundVideoProps = {
  posterSrc: string;
  desktopIframeSrc?: string;
  mobileIframeSrc?: string;
  cover?: boolean;
  posterPriority?: boolean;
  className?: string;
};

export default function BackgroundVideo({
  posterSrc,
  desktopIframeSrc,
  mobileIframeSrc,
  cover = false,
  posterPriority = false,
  className
}: BackgroundVideoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(null);
  const [desktopVideoReady, setDesktopVideoReady] = useState(false);
  const [mobileVideoReady, setMobileVideoReady] = useState(false);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    const updateViewportState = () => setIsDesktopViewport(desktopMediaQuery.matches);
    const updateReducedMotionState = () => setPrefersReducedMotion(reducedMotionMediaQuery.matches);

    updateViewportState();
    updateReducedMotionState();

    desktopMediaQuery.addEventListener("change", updateViewportState);
    reducedMotionMediaQuery.addEventListener("change", updateReducedMotionState);

    if (!reducedMotionMediaQuery.matches) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCanLoadVideo(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "300px" }
      );

      if (wrapperRef.current) {
        observer.observe(wrapperRef.current);
      }
    }

    return () => {
      desktopMediaQuery.removeEventListener("change", updateViewportState);
      reducedMotionMediaQuery.removeEventListener("change", updateReducedMotionState);
      observer?.disconnect();
    };
  }, []);

  const desktopIframeSrcWithHiddenControls = withHiddenCloudflareControls(desktopIframeSrc);
  const mobileIframeSrcWithHiddenControls = withHiddenCloudflareControls(mobileIframeSrc);
  const hasDesktopVideo = Boolean(desktopIframeSrcWithHiddenControls);
  const hasMobileVideo = Boolean(mobileIframeSrcWithHiddenControls);

  let activeVideoReady = false;
  if (hasDesktopVideo && hasMobileVideo) {
    if (isDesktopViewport !== null) {
      activeVideoReady = isDesktopViewport ? desktopVideoReady : mobileVideoReady;
    }
  } else if (hasDesktopVideo) {
    activeVideoReady = desktopVideoReady;
  } else if (hasMobileVideo) {
    activeVideoReady = mobileVideoReady;
  }

  const iframeClassName = cn(
    "absolute inset-0 h-full w-full border-0 pointer-events-none transition-opacity duration-700 ease-out",
    cover &&
      "inset-auto left-1/2 top-1/2 h-full w-auto min-w-full max-w-none min-h-full -translate-x-1/2 -translate-y-1/2 [aspect-ratio:16/9]"
  );

  const shouldRenderVideo = canLoadVideo && !prefersReducedMotion && (hasDesktopVideo || hasMobileVideo);
  const shouldHidePoster = shouldRenderVideo && activeVideoReady;

  // Only render the iframe needed for the current viewport to avoid loading unused video
  const shouldRenderDesktop = shouldRenderVideo && hasDesktopVideo && (!hasMobileVideo || isDesktopViewport === true);
  const shouldRenderMobile = shouldRenderVideo && hasMobileVideo && (!hasDesktopVideo || isDesktopViewport === false);

  return (
    <div ref={wrapperRef} className={cn("relative overflow-hidden", className)}>
      <Image
        src={posterSrc}
        alt="Studio teaser"
        fill
        priority={posterPriority}
        className={cn("object-cover transition-opacity duration-700 ease-out", shouldHidePoster ? "opacity-0" : "opacity-100")}
        sizes="100vw"
      />

      {shouldRenderDesktop ? (
        <iframe
          src={desktopIframeSrcWithHiddenControls}
          loading="lazy"
          allow="autoplay; encrypted-media;"
          title="Studio teaser video"
          aria-hidden="true"
          tabIndex={-1}
          className={cn(iframeClassName, desktopVideoReady ? "opacity-100" : "opacity-0")}
          onLoad={() => setDesktopVideoReady(true)}
        />
      ) : null}

      {shouldRenderMobile ? (
        <iframe
          src={mobileIframeSrcWithHiddenControls}
          loading="lazy"
          allow="autoplay; encrypted-media;"
          title="Studio teaser video"
          aria-hidden="true"
          tabIndex={-1}
          className={cn(iframeClassName, mobileVideoReady ? "opacity-100" : "opacity-0")}
          onLoad={() => setMobileVideoReady(true)}
        />
      ) : null}
    </div>
  );
}
