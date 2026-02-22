import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { nanoid } from "nanoid";
import { extractWaitlistUser, type ClerkWebhookUser } from "@/lib/clerk";
import { subscribeToConvertKit } from "@/lib/convertkit";
import { createSupabaseServiceRoleClient } from "@/lib/supabase";

type ClerkWaitlistEntry = {
  id: string;
  email_address: string;
};

type ClerkWebhookPayload = {
  type: string;
  data: ClerkWebhookUser | ClerkWaitlistEntry;
};

const WAITLIST_CREATED_TYPES = new Set(["waitlistEntry.created", "waitlist_entry.created"]);

function isWaitlistEntry(data: ClerkWebhookPayload["data"]): data is ClerkWaitlistEntry {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "email_address" in data &&
    typeof data.id === "string" &&
    typeof data.email_address === "string"
  );
}

async function generateUniqueReferralCode() {
  return nanoid(8);
}

async function incrementReferrerCount(referralCode: string) {
  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return;
  }

  const referrer = await client
    .from("waitlist_entries")
    .select("referral_count")
    .eq("referral_code", referralCode)
    .maybeSingle();

  if (referrer.data) {
    await client
      .from("waitlist_entries")
      .update({ referral_count: (referrer.data.referral_count ?? 0) + 1 })
      .eq("referral_code", referralCode);
  }
}

async function getWaitlistPosition() {
  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return 1;
  }

  const { count } = await client.from("waitlist_entries").select("id", { count: "exact", head: true });
  return (count ?? 0) + 1;
}

export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ ok: false, message: "Missing Clerk webhook secret." }, { status: 500 });
  }

  const payload = await request.text();
  const requestHeaders = await headers();
  const svixId = requestHeaders.get("svix-id");
  const svixTimestamp = requestHeaders.get("svix-timestamp");
  const svixSignature = requestHeaders.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ ok: false, message: "Missing Svix headers." }, { status: 400 });
  }

  const webhook = new Webhook(secret);
  let event: ClerkWebhookPayload;

  try {
    event = webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature
    }) as ClerkWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid webhook signature." }, { status: 400 });
  }

  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return NextResponse.json({ ok: false, message: "Supabase client unavailable." }, { status: 500 });
  }

  if (event.type === "user.created") {
    const parsedUser = extractWaitlistUser(event.data as ClerkWebhookUser);

    if (!parsedUser.email) {
      return NextResponse.json({ ok: false, message: "User has no primary email." }, { status: 400 });
    }

    const existingByClerkId = await client
      .from("waitlist_entries")
      .select("id")
      .eq("clerk_user_id", parsedUser.clerkUserId)
      .maybeSingle();

    if (existingByClerkId.data?.id) {
      return NextResponse.json({ ok: true, idempotent: true });
    }

    const existingByEmail = await client
      .from("waitlist_entries")
      .select("id, referred_by")
      .eq("email", parsedUser.email)
      .maybeSingle();

    if (existingByEmail.data?.id) {
      const mergedReferredBy = existingByEmail.data.referred_by ?? parsedUser.referredBy;

      const updateResult = await client
        .from("waitlist_entries")
        .update({
          clerk_user_id: parsedUser.clerkUserId,
          full_name: parsedUser.fullName,
          utm_source: parsedUser.utmSource,
          utm_medium: parsedUser.utmMedium,
          utm_campaign: parsedUser.utmCampaign,
          referred_by: mergedReferredBy
        })
        .eq("id", existingByEmail.data.id);

      if (updateResult.error) {
        return NextResponse.json({ ok: false, message: updateResult.error.message }, { status: 500 });
      }

      if (parsedUser.referredBy && !existingByEmail.data.referred_by) {
        await incrementReferrerCount(parsedUser.referredBy);
      }

      await subscribeToConvertKit(parsedUser.email, parsedUser.firstName);

      return NextResponse.json({ ok: true, merged: true });
    }

    const waitlistPosition = await getWaitlistPosition();

    const insertResult = await client.from("waitlist_entries").insert({
      clerk_user_id: parsedUser.clerkUserId,
      email: parsedUser.email,
      full_name: parsedUser.fullName,
      referral_code: await generateUniqueReferralCode(),
      referred_by: parsedUser.referredBy,
      utm_source: parsedUser.utmSource,
      utm_medium: parsedUser.utmMedium,
      utm_campaign: parsedUser.utmCampaign,
      waitlist_position: waitlistPosition
    });

    if (insertResult.error) {
      return NextResponse.json({ ok: false, message: insertResult.error.message }, { status: 500 });
    }

    if (parsedUser.referredBy) {
      await incrementReferrerCount(parsedUser.referredBy);
    }

    await subscribeToConvertKit(parsedUser.email, parsedUser.firstName);

    return NextResponse.json({ ok: true });
  }

  if (WAITLIST_CREATED_TYPES.has(event.type) && isWaitlistEntry(event.data)) {
    const existingByWaitlistId = await client
      .from("waitlist_entries")
      .select("id")
      .eq("clerk_user_id", `waitlist:${event.data.id}`)
      .maybeSingle();

    if (existingByWaitlistId.data?.id) {
      return NextResponse.json({ ok: true, idempotent: true });
    }

    const existingByEmail = await client
      .from("waitlist_entries")
      .select("id")
      .eq("email", event.data.email_address)
      .maybeSingle();

    if (existingByEmail.data?.id) {
      return NextResponse.json({ ok: true, idempotent: true });
    }

    const waitlistPosition = await getWaitlistPosition();

    const insertResult = await client.from("waitlist_entries").insert({
      clerk_user_id: `waitlist:${event.data.id}`,
      email: event.data.email_address,
      full_name: null,
      referral_code: await generateUniqueReferralCode(),
      referred_by: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      waitlist_position: waitlistPosition
    });

    if (insertResult.error) {
      return NextResponse.json({ ok: false, message: insertResult.error.message }, { status: 500 });
    }

    await subscribeToConvertKit(event.data.email_address);

    return NextResponse.json({ ok: true, waitlistEntry: true });
  }

  return NextResponse.json({ ok: true, ignored: true });
}
