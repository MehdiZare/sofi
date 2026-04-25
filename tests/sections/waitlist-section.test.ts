import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import WaitlistSection from "@/components/sections/WaitlistSection";
import { contentByLocale, SECTION_IDS } from "@/lib/constants";
import { locales } from "@/lib/i18n";

vi.mock("@/components/shared/WaitlistForm", () => ({
  default: () => null
}));

describe("WaitlistSection", () => {
  it("keeps the waitlist anchor available for every localized homepage", () => {
    for (const locale of locales) {
      const html = renderToStaticMarkup(
        React.createElement(WaitlistSection, {
          content: contentByLocale[locale]
        })
      );

      expect(html).toMatch(new RegExp(`<section[^>]*id="${SECTION_IDS.waitlist}"`));
    }
  });
});
