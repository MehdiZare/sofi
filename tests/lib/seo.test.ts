import { afterEach, describe, expect, it } from "vitest";
import { getLocalizedClass, getLocalizedClassGroups } from "@/lib/classes";
import { buildClassStructuredData, buildHomepageStructuredData } from "@/lib/seo";

const originalStreamId = process.env.NEXT_PUBLIC_CLOUDFLARE_HOT_POWER_FLOW_STREAM_ID;
const originalCustomerSubdomain = process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN;

afterEach(() => {
  if (originalStreamId === undefined) {
    delete process.env.NEXT_PUBLIC_CLOUDFLARE_HOT_POWER_FLOW_STREAM_ID;
  } else {
    process.env.NEXT_PUBLIC_CLOUDFLARE_HOT_POWER_FLOW_STREAM_ID = originalStreamId;
  }

  if (originalCustomerSubdomain === undefined) {
    delete process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN;
  } else {
    process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN = originalCustomerSubdomain;
  }
});

describe("seo structured data", () => {
  it("builds homepage schema set", () => {
    const groups = getLocalizedClassGroups("en");
    const schemas = buildHomepageStructuredData(
      "en",
      "https://sofi.fitness",
      "English-friendly boutique fitness in Yerevan.",
      groups
    );

    expect(schemas).toHaveLength(3);
    const healthClub = schemas.find((schema) => schema["@type"] === "HealthClub");
    expect(healthClub).toBeTruthy();
    expect(healthClub?.inLanguage).toBe("en-US");
  });

  it("builds class schema including VideoObject when stream data is available", () => {
    process.env.NEXT_PUBLIC_CLOUDFLARE_HOT_POWER_FLOW_STREAM_ID = "abc123";
    process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN = "customer-example.cloudflarestream.com";

    const fitnessClass = getLocalizedClass("en", "hot-power-flow");
    expect(fitnessClass).toBeTruthy();

    const schemas = buildClassStructuredData("en", "https://sofi.fitness", fitnessClass!);
    const types = schemas.map((schema) => schema["@type"]);

    expect(types).toContain("ExercisePlan");
    expect(types).toContain("VideoObject");
  });
});
