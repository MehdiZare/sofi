import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import TrackingScripts from "@/components/shared/TrackingScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofia.fitness"),
  title: "Studio Yerevan",
  description:
    "Yerevan's first English-friendly boutique fitness studio. Hot yoga, barre, and Pilates reformer classes.",
  robots: {
    index: true,
    follow: true
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const page = (
    <html lang="en">
      <body className="bg-bg text-text antialiased">
        <TrackingScripts />
        {children}
        <Analytics />
      </body>
    </html>
  );

  if (!clerkPublishableKey) {
    return page;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {page}
    </ClerkProvider>
  );
}
