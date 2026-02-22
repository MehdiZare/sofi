import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Send } from "lucide-react";
import type { LandingContent } from "@/lib/constants";

type FooterProps = {
  content: LandingContent;
};

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="section-shell border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <p className="mono text-sm uppercase tracking-[0.18em] text-accent-warm">{content.siteName}</p>
        <p className="max-w-xl text-text-muted">{content.footerTagline}</p>

        <div className="flex items-center gap-4 text-text-muted">
          <a href="https://instagram.com/studioyerevan" aria-label="Instagram" target="_blank" rel="noreferrer">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://t.me/studioyerevan" aria-label="Telegram" target="_blank" rel="noreferrer">
            <Send className="h-5 w-5" />
          </a>
          <a href="https://facebook.com/studioyerevan" aria-label="Facebook" target="_blank" rel="noreferrer">
            <Facebook className="h-5 w-5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          <a href="mailto:hello@studioyerevan.com" className="inline-flex items-center gap-2 hover:text-text">
            <Mail className="h-4 w-4" />
            hello@studioyerevan.com
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {content.cityLabel}
          </span>
        </div>

        <div className="flex gap-5 text-xs uppercase tracking-[0.14em] text-text-muted">
          <Link href="/privacy" className="hover:text-text">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-text">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
