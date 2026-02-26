"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { withCloudflareHoverPlaybackParams } from "@/lib/video";

const CLOUDFLARE_STREAM_SDK_ID = "cloudflare-stream-sdk";
const CLOUDFLARE_STREAM_SDK_SRC = "https://embed.cloudflarestream.com/embed/sdk.latest.js";

type CloudflareStreamPlayer = {
  play?: () => Promise<void> | void;
  pause?: () => void;
  currentTime?: number;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
};

export type CloudflareHoverPlayerHandle = {
  play: () => void;
  pauseAndReset: () => void;
};

type CloudflareHoverPlayerProps = {
  iframeSrc: string;
  title: string;
  className?: string;
};

declare global {
  interface Window {
    Stream?: (iframeElement: HTMLIFrameElement) => CloudflareStreamPlayer;
  }
}

let cloudflareSdkLoadPromise: Promise<void> | null = null;

function loadCloudflareSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Stream) {
    return Promise.resolve();
  }

  if (cloudflareSdkLoadPromise) {
    return cloudflareSdkLoadPromise;
  }

  cloudflareSdkLoadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(CLOUDFLARE_STREAM_SDK_ID) as HTMLScriptElement | null;

    if (existing) {
      if (window.Stream) {
        resolve();
        return;
      }

      const onLoad = () => resolve();
      const onError = () => reject(new Error("Failed to load Cloudflare Stream SDK"));
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = CLOUDFLARE_STREAM_SDK_ID;
    script.src = CLOUDFLARE_STREAM_SDK_SRC;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Failed to load Cloudflare Stream SDK")), { once: true });
    document.head.appendChild(script);
  });

  return cloudflareSdkLoadPromise;
}

const CloudflareHoverPlayer = forwardRef<CloudflareHoverPlayerHandle, CloudflareHoverPlayerProps>(
  ({ iframeSrc, title, className }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const playerRef = useRef<CloudflareStreamPlayer | null>(null);
    const embedSrc = useMemo(() => withCloudflareHoverPlaybackParams(iframeSrc) ?? iframeSrc, [iframeSrc]);

    useEffect(() => {
      let disposed = false;

      const setupPlayer = async () => {
        await loadCloudflareSdk();

        if (disposed || !iframeRef.current || !window.Stream) {
          return;
        }

        const player = window.Stream(iframeRef.current);
        player.muted = true;
        player.loop = true;
        player.controls = false;
        playerRef.current = player;
      };

      void setupPlayer().catch(() => {
        // Keep iframe rendered even if SDK fails; hover controls simply won't be active.
      });

      return () => {
        disposed = true;
        playerRef.current = null;
      };
    }, [embedSrc]);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (!playerRef.current?.play) {
          return;
        }

        void playerRef.current.play();
      },
      pauseAndReset: () => {
        if (!playerRef.current) {
          return;
        }

        playerRef.current.pause?.();

        if (typeof playerRef.current.currentTime === "number") {
          playerRef.current.currentTime = 0;
        }
      }
    }));

    return (
      <iframe
        ref={iframeRef}
        src={embedSrc}
        loading="lazy"
        title={title}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        className={className}
      />
    );
  }
);

CloudflareHoverPlayer.displayName = "CloudflareHoverPlayer";

export default CloudflareHoverPlayer;
