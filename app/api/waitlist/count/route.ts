import { NextResponse } from "next/server";
import { getWaitlistStats } from "@/lib/waitlist";

export const revalidate = 60;

export async function GET() {
  const stats = await getWaitlistStats();

  return NextResponse.json(
    {
      count: stats.count,
      spots_remaining: stats.spotsRemaining
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120"
      }
    }
  );
}
