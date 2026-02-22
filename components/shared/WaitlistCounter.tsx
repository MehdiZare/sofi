"use client";

import { useEffect, useState } from "react";
import AnimatedNumber from "@/components/shared/AnimatedNumber";
import { calculateSpotsRemaining } from "@/lib/waitlist";

type WaitlistCounterProps = {
  initialCount: number;
  mode?: "count" | "spots";
  className?: string;
  refreshMs?: number;
};

export default function WaitlistCounter({
  initialCount,
  mode = "count",
  className,
  refreshMs = 45_000
}: WaitlistCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    let mounted = true;

    const refresh = async () => {
      try {
        const response = await fetch("/api/waitlist/count", {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) {
          return;
        }

        const body = (await response.json()) as { count?: number };

        if (mounted && typeof body.count === "number") {
          setCount(body.count);
        }
      } catch {
        // No-op for transient network errors.
      }
    };

    const interval = window.setInterval(refresh, refreshMs);
    refresh();

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [refreshMs]);

  const value = mode === "count" ? count : calculateSpotsRemaining(count);

  return (
    <span className={className}>
      <AnimatedNumber value={value} />
    </span>
  );
}
