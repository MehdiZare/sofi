"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { withHiddenCloudflareControls } from "@/lib/video";

type BackgroundVideoProps = {
  posterSrc: string;
  desktopIframeSrc?: string;
  mobileIframeSrc?: string;
  mobileCover?: boolean;
  className?: string;
};

export default function BackgroundVideo({
  posterSrc,
  desktopIframeSrc,
  mobileIframeSrc,
  mobileCover = false,
  className
}: BackgroundVideoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();

    mediaQuery.addEventListener("change", updateMobileState);

    if (reducedMotion.matches) {
      return () => {
        mediaQuery.removeEventListener("change", updateMobileState);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
      observer.disconnect();
    };
  }, []);

  const iframeSrc = isMobile && mobileIframeSrc ? mobileIframeSrc : desktopIframeSrc;
  const iframeSrcWithHiddenControls = withHiddenCloudflareControls(iframeSrc);
  const iframeClassName = mobileCover
    ? "absolute inset-0 h-full w-full border-0 max-md:inset-auto max-md:left-1/2 max-md:top-1/2 max-md:h-full max-md:w-auto max-md:max-w-none max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:[aspect-ratio:16/9]"
    : "absolute inset-0 h-full w-full border-0";

  return (
    <div ref={wrapperRef} className={cn("relative overflow-hidden", className)}>
      <Image
        src={posterSrc}
        alt="Studio teaser"
        fill
        unoptimized
        priority
        className="object-cover"
        sizes="100vw"
      />
      {canLoadVideo && iframeSrcWithHiddenControls ? (
        <iframe
          src={iframeSrcWithHiddenControls}
          loading="lazy"
          allow="autoplay; encrypted-media;"
          title="Studio teaser video"
          className={iframeClassName}
        />
      ) : null}
    </div>
  );
}
