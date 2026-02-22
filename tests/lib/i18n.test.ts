import { describe, expect, it } from "vitest";
import { replacePathLocale, resolveLocale } from "@/lib/i18n";

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

describe("replacePathLocale", () => {
  it("replaces locale segment when present", () => {
    expect(replacePathLocale("/en", "hy")).toBe("/hy");
    expect(replacePathLocale("/en/privacy", "ru")).toBe("/ru/privacy");
  });

  it("prefixes locale segment when absent", () => {
    expect(replacePathLocale("/", "hy")).toBe("/hy");
    expect(replacePathLocale("/privacy", "ru")).toBe("/ru/privacy");
  });
});
