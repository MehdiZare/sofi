"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type SectionViewTrackerProps = {
  locale: Locale;
};

export default function SectionViewTracker({ locale }: SectionViewTrackerProps) {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-track-section]"));

    if (sections.length === 0) {
      return;
    }

    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const sectionId = entry.target.getAttribute("data-track-section");

          if (!sectionId || seen.has(sectionId)) {
            continue;
          }

          seen.add(sectionId);
          void trackAnalyticsEvent({
            event: "section_view",
            section: sectionId,
            metadata: { locale }
          });
        }
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [locale]);

  return null;
}
