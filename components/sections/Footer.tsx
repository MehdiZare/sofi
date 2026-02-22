import Link from "next/link";
import { Mail, MapPin, Send } from "lucide-react";
import type { LandingContent } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  content: LandingContent;
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.2 2H8A4 4 0 0 0 4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-4 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Zm4.8-2.9a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.5 1.6-1.5h1.2V5c-.6-.1-1.3-.2-2-.2-2.3 0-3.8 1.4-3.8 4V11H8v3h2.5v7h3Z" />
    </svg>
  );
}

export default function Footer({ locale, content }: FooterProps) {
  return (
    <footer className="section-shell border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <p className="mono text-sm uppercase tracking-[0.18em] text-accent-warm">{content.siteName}</p>
        <p className="max-w-xl text-text-muted">{content.footerTagline}</p>

        <div className="flex items-center gap-4 text-text-muted">
          <a href="https://instagram.com/studioyerevan" aria-label="Instagram" target="_blank" rel="noreferrer">
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a href="https://t.me/studioyerevan" aria-label="Telegram" target="_blank" rel="noreferrer">
            <Send className="h-5 w-5" />
          </a>
          <a href="https://facebook.com/studioyerevan" aria-label="Facebook" target="_blank" rel="noreferrer">
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          <a href="mailto:hello@sofia.fitness" className="inline-flex items-center gap-2 hover:text-text">
            <Mail className="h-4 w-4" />
            hello@sofia.fitness
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {content.cityLabel}
          </span>
        </div>

        <div className="flex gap-5 text-xs uppercase tracking-[0.14em] text-text-muted">
          <Link href={`/${locale}/privacy`} className="hover:text-text">
            {content.privacyLabel}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-text">
            {content.termsLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
