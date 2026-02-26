import { describe, expect, it } from "vitest";
import {
  classSlugOrder,
  getLocalizedClass,
  getLocalizedClassGroups,
  getLocalizedClasses,
  isClassSlug
} from "@/lib/classes";

describe("class catalog", () => {
  it("exposes all 11 class slugs", () => {
    expect(classSlugOrder).toHaveLength(11);
  });

  it("returns four localized groups", () => {
    const groups = getLocalizedClassGroups("en");
    expect(groups).toHaveLength(4);

    const totalClasses = groups.reduce((total, group) => total + group.classes.length, 0);
    expect(totalClasses).toBe(11);
  });

  it("finds a class by slug", () => {
    const fitnessClass = getLocalizedClass("en", "hot-power-flow");
    expect(fitnessClass?.title).toBe("Hot Power Flow");
  });

  it("returns null for unsupported slugs", () => {
    expect(getLocalizedClass("en", "unknown-class")).toBeNull();
  });

  it("validates known class slugs", () => {
    expect(isClassSlug("yin-release")).toBe(true);
    expect(isClassSlug("yin-release-x")).toBe(false);
  });

  it("returns 11 localized class records", () => {
    expect(getLocalizedClasses("hy")).toHaveLength(11);
  });
});
