import { describe, expect, it } from "vitest";
import { resolveLocale } from "@/lib/i18n";

describe("resolveLocale", () => {
  it("falls back to english when undefined", () => {
    expect(resolveLocale(undefined)).toBe("en");
  });

  it("resolves Armenian dialect tags to hy", () => {
    expect(resolveLocale("hy-AM")).toBe("hy");
  });

  it("resolves Russian dialect tags to ru", () => {
    expect(resolveLocale("ru-RU")).toBe("ru");
  });
});
