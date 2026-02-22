"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

type CookieConsentProps = {
  text: string;
  acceptLabel: string;
  declineLabel: string;
};

const CONSENT_KEY = "sofi_cookie_consent";

export default function CookieConsent({ text, acceptLabel, declineLabel }: CookieConsentProps) {
  const persistedConsent = useSyncExternalStore(
    () => () => {},
    () => {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved === "accepted" || saved === "declined") {
        return saved;
      }
      return null;
    },
    // Hide during SSR to avoid hydration mismatch.
    () => "accepted"
  );

  const [runtimeConsent, setRuntimeConsent] = useState<"accepted" | "declined" | null>(null);
  const consent = runtimeConsent ?? persistedConsent;

  const handleChoice = (choice: "accepted" | "declined") => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setRuntimeConsent(choice);
  };

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-white/15 bg-bg/95 p-4 shadow-2xl backdrop-blur">
      <p className="text-sm text-text-muted">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" size="sm" onClick={() => handleChoice("accepted")}>{acceptLabel}</Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => handleChoice("declined")}>{declineLabel}</Button>
      </div>
    </div>
  );
}
