import { z } from "zod";

const convertKitResponseSchema = z.object({
  subscription: z
    .object({
      id: z.number()
    })
    .optional()
});

export async function subscribeToConvertKit(email: string, firstName?: string | null) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    return { ok: false as const, reason: "missing-config" as const };
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      first_name: firstName ?? undefined
    })
  });

  if (!response.ok) {
    return { ok: false as const, reason: "request-failed" as const };
  }

  const body = await response.json();
  const parsed = convertKitResponseSchema.safeParse(body);

  if (!parsed.success) {
    return { ok: false as const, reason: "invalid-response" as const };
  }

  return { ok: true as const };
}
