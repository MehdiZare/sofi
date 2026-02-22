"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get("ref");

    if (!refCode) {
      return;
    }

    void fetch("/api/waitlist/referral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: refCode })
    });
  }, [searchParams]);

  return null;
}
