"use client";

import { Waitlist } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function WaitlistForm() {
  if (!clerkPublishableKey) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-surface/80 p-6 text-left">
        <p className="text-sm text-text-muted">
          Clerk keys are not configured yet. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to enable
          production waitlist signup.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            type="email"
            disabled
            placeholder="you@example.com"
            className="h-12 w-full rounded-2xl border border-white/15 bg-surface-elevated px-4 text-text-muted"
          />
          <Button disabled>Notify Me</Button>
        </div>
      </div>
    );
  }

  return (
    <Waitlist
      appearance={{
        elements: {
          rootBox: "mx-auto w-full max-w-md",
          card: "bg-transparent shadow-none border border-white/10 rounded-3xl p-4 sm:p-8 backdrop-blur",
          headerTitle: "text-text",
          headerSubtitle: "text-text-muted",
          formButtonPrimary:
            "bg-primary hover:bg-primary-hover text-white rounded-full h-12 text-base font-semibold transition",
          socialButtonsBlockButton: "rounded-full border border-white/15 bg-surface-elevated",
          formFieldInput:
            "h-12 rounded-2xl border border-white/15 bg-surface text-text placeholder:text-text-muted",
          footerActionText: "text-text-muted",
          footerActionLink: "text-accent-warm"
        }
      }}
      signInUrl="/"
    />
  );
}
