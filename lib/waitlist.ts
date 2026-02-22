import { WAITLIST_CAPACITY } from "@/lib/constants";
import { createSupabaseServiceRoleClient } from "@/lib/supabase";

export type WaitlistStats = {
  count: number;
  spotsRemaining: number;
};

function toSpotsRemaining(count: number): number {
  return Math.max(WAITLIST_CAPACITY - count, 0);
}

export async function getWaitlistStats(): Promise<WaitlistStats> {
  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return {
      count: 0,
      spotsRemaining: WAITLIST_CAPACITY
    };
  }

  const { count, error } = await client
    .from("waitlist_entries")
    .select("id", { count: "exact", head: true });

  if (error) {
    return {
      count: 0,
      spotsRemaining: WAITLIST_CAPACITY
    };
  }

  const total = count ?? 0;

  return {
    count: total,
    spotsRemaining: toSpotsRemaining(total)
  };
}

export function calculateSpotsRemaining(count: number): number {
  return toSpotsRemaining(count);
}
