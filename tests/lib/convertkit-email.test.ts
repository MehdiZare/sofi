import { describe, expect, it } from "vitest";
import { getConvertKitSequenceTemplates, getConvertKitTemplate } from "@/lib/convertkit-email";

describe("getConvertKitTemplate", () => {
  it("replaces tokens with provided values", () => {
    const rendered = getConvertKitTemplate("en", "day7", {
      referralLink: "https://sofi.fitness/r/abc123"
    });

    expect(rendered.body).toContain("https://sofi.fitness/r/abc123");
  });

  it("uses defaults when token values are not provided", () => {
    const rendered = getConvertKitTemplate("en", "welcome");

    expect(rendered.body).toContain("@studioyerevan");
  });
});

describe("getConvertKitSequenceTemplates", () => {
  it("returns all sequence steps in order with metadata", () => {
    const templates = getConvertKitSequenceTemplates("ru");

    expect(templates.map((item) => item.step)).toEqual(["welcome", "day3", "day7"]);
    expect(templates.map((item) => item.dayOffset)).toEqual([0, 3, 7]);
  });
});

