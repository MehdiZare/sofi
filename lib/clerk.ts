export type ClerkWebhookUser = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  primary_email_address_id?: string | null;
  email_addresses?: Array<{ id: string; email_address: string }>;
  public_metadata?: Record<string, unknown> | null;
  unsafe_metadata?: Record<string, unknown> | null;
};

function resolvePrimaryEmail(user: ClerkWebhookUser): string | null {
  const primaryEmailId = user.primary_email_address_id;

  if (!primaryEmailId || !Array.isArray(user.email_addresses)) {
    return null;
  }

  const primary = user.email_addresses.find((email) => email.id === primaryEmailId);
  return primary?.email_address ?? null;
}

export function extractWaitlistUser(user: ClerkWebhookUser) {
  const email = resolvePrimaryEmail(user);
  const firstName = user.first_name ?? "";
  const lastName = user.last_name ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;

  const metadata = {
    ...(typeof user.public_metadata === "object" && user.public_metadata
      ? user.public_metadata
      : {}),
    ...(typeof user.unsafe_metadata === "object" && user.unsafe_metadata
      ? user.unsafe_metadata
      : {})
  } as Record<string, unknown>;

  return {
    clerkUserId: user.id,
    email,
    firstName,
    fullName,
    utmSource: typeof metadata.utm_source === "string" ? metadata.utm_source : null,
    utmMedium: typeof metadata.utm_medium === "string" ? metadata.utm_medium : null,
    utmCampaign: typeof metadata.utm_campaign === "string" ? metadata.utm_campaign : null,
    referredBy: typeof metadata.referred_by === "string" ? metadata.referred_by : null
  };
}
