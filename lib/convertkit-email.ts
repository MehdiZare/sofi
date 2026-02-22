import { emailSequenceByLocale, type EmailSequenceContent } from "@/lib/email-content";
import type { Locale } from "@/lib/i18n";

export type ConvertKitSequenceStep = keyof EmailSequenceContent;

export type ConvertKitTemplateTokens = {
  instagramHandle?: string;
  referralLink?: string;
};

export type ConvertKitTemplate = {
  subject: string;
  body: string;
};

export type ConvertKitSequenceTemplate = ConvertKitTemplate & {
  step: ConvertKitSequenceStep;
  dayOffset: number;
  internalName: string;
};

const sequenceStepConfig: Record<ConvertKitSequenceStep, { dayOffset: number; internalName: string }> = {
  welcome: { dayOffset: 0, internalName: "welcome" },
  day3: { dayOffset: 3, internalName: "what_to_expect_day_3" },
  day7: { dayOffset: 7, internalName: "refer_a_friend_day_7" }
};

function applyTokens(text: string, tokens: ConvertKitTemplateTokens): string {
  return text
    .replaceAll("{{instagram_handle}}", tokens.instagramHandle ?? "@studioyerevan")
    .replaceAll("{{referral_link}}", tokens.referralLink ?? "[LINK]");
}

export function getConvertKitTemplate(
  locale: Locale,
  step: ConvertKitSequenceStep,
  tokens: ConvertKitTemplateTokens = {}
): ConvertKitTemplate {
  const template = emailSequenceByLocale[locale][step];
  return {
    subject: applyTokens(template.subject, tokens),
    body: applyTokens(template.body, tokens)
  };
}

export function getConvertKitSequenceTemplates(
  locale: Locale,
  tokens: ConvertKitTemplateTokens = {}
): ConvertKitSequenceTemplate[] {
  const steps: ConvertKitSequenceStep[] = ["welcome", "day3", "day7"];

  return steps.map((step) => {
    const rendered = getConvertKitTemplate(locale, step, tokens);
    const config = sequenceStepConfig[step];

    return {
      ...rendered,
      step,
      dayOffset: config.dayOffset,
      internalName: config.internalName
    };
  });
}

