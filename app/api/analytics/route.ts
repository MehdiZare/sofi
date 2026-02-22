import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { analyticsEventSchema } from "@/lib/analytics";
import { createSupabaseServiceRoleClient, type Json } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Invalid payload." }, { status: 400 });
  }

  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") ?? "en";
  const userAgent = requestHeaders.get("user-agent") ?? "unknown";
  const safeMetadata = {
    ...(parsed.data.metadata ?? {}),
    userAgent
  } as Json;

  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  await client.from("analytics_events").insert({
    event: parsed.data.event,
    section: parsed.data.section ?? null,
    locale,
    metadata: safeMetadata
  });

  return NextResponse.json({ ok: true });
}
