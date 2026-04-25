import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import PosthogProvider from "@/components/shared/PosthogProvider";
import TrackingScripts from "@/components/shared/TrackingScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sofi.fitness"),
  title: "Sofi Fitness",
  description:
    "Yerevan's first English-friendly boutique fitness studio. Hot yoga, strength, mobility, and recovery classes.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }]
  },
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
