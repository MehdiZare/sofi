import { describe, expect, it } from "vitest";
import { getClerkLocalization } from "@/lib/clerk-localization";

describe("getClerkLocalization", () => {
  it("returns localized waitlist start copy for ru", () => {
    const localization = getClerkLocalization("ru");

    expect(localization.waitlist.start.title).toBe("Записаться в лист ожидания");
    expect(localization.waitlist.start.actionLink).toBe("Войти");
  });

  it("returns localized waitlist start copy for hy", () => {
    const localization = getClerkLocalization("hy");

    expect(localization.waitlist.start.title).toBe("Միանալ սպասման ցուցակին");
    expect(localization.formFieldLabel__emailAddress).toBe("Email");
  });
});
