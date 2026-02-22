import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServiceRoleClient } from "@/lib/supabase";

const requestSchema = z.object({
  code: z
    .string()
    .trim()
    .min(4)
    .max(32)
    .regex(/^[A-Za-z0-9_-]+$/)
});

const REF_COOKIE = "landing_ref";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ valid: false, message: "Invalid referral code format." }, { status: 400 });
  }

  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return NextResponse.json({ valid: false, message: "Referral system unavailable." }, { status: 503 });
  }

  const { data, error } = await client
    .from("waitlist_entries")
    .select("referral_code")
    .eq("referral_code", parsed.data.code)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ valid: false });
  }

  const cookieStore = await cookies();
  cookieStore.set(REF_COOKIE, parsed.data.code, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });

  return NextResponse.json({ valid: true, referrer: { code: parsed.data.code } });
}
