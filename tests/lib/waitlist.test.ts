import { describe, expect, it } from "vitest";
import { calculateSpotsRemaining } from "@/lib/waitlist";

describe("calculateSpotsRemaining", () => {
  it("returns full capacity when count is zero", () => {
    expect(calculateSpotsRemaining(0)).toBe(100);
  });

  it("returns reduced spots when count is below capacity", () => {
    expect(calculateSpotsRemaining(42)).toBe(58);
  });

  it("clamps at zero when count exceeds capacity", () => {
    expect(calculateSpotsRemaining(150)).toBe(0);
  });
});
