"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export default function PosthogProvider() {
  useEffect(() => {
    if (!posthogKey) {
      return;
    }

    posthog.init(posthogKey, {
      api_host: posthogHost,
      autocapture: true,
      capture_pageview: true
    });
  }, []);

  return null;
}
