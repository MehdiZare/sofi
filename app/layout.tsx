import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import PosthogProvider from "@/components/shared/PosthogProvider";
import TrackingScripts from "@/components/shared/TrackingScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofia.fitness"),
  title: "Sofi Fitness",
  description:
    "Yerevan's first English-friendly boutique fitness studio. Hot yoga, strength, mobility, and recovery classes.",
  robots: {
    index: true,
    follow: true
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-bg text-text antialiased">
        <TrackingScripts />
        <PosthogProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
