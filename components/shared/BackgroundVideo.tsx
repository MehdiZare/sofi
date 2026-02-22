"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { withHiddenCloudflareControls } from "@/lib/video";

type BackgroundVideoProps = {
  posterSrc: string;
  desktopIframeSrc?: string;
  mobileIframeSrc?: string;
  className?: string;
};

export default function BackgroundVideo({
  posterSrc,
  desktopIframeSrc,
  mobileIframeSrc,
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
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : null}
    </div>
  );
}
