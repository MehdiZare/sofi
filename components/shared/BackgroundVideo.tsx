"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BackgroundVideoProps = {
  posterSrc: string;
  desktopSrc: string;
  mobileSrc?: string;
  className?: string;
};

export default function BackgroundVideo({
  posterSrc,
  desktopSrc,
  mobileSrc,
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

    if (reducedMotion.matches || mediaQuery.matches) {
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

  const source = isMobile && mobileSrc ? mobileSrc : desktopSrc;

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
      {canLoadVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={posterSrc}
        >
          <source src={source} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
