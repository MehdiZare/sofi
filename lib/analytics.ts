import { z } from "zod";

export const analyticsEventSchema = z.object({
  event: z.string().min(1),
  section: z.string().min(1).optional(),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export type AnalyticsEventPayload = z.infer<typeof analyticsEventSchema>;

export async function trackAnalyticsEvent(payload: AnalyticsEventPayload) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch {
    // No-op to avoid blocking UX on analytics failures.
  }
}
