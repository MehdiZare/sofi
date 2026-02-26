"use client";

import Link from "next/link";
import { Suspense } from "react";
import LanguageSelector from "@/components/shared/LanguageSelector";
import { SECTION_IDS, type NavLabels } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

type InnerNavigationProps = {
  locale: Locale;
  siteName: string;
  ctaLabel: string;
  navLabels: NavLabels;
  languageNames: Record<Locale, string>;
  languageSelectorLabel: string;
};

export default function InnerNavigation({
  locale,
  siteName,
  ctaLabel,
  navLabels,
  languageNames,
  languageSelectorLabel
}: InnerNavigationProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-bg/65 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 md:px-8">
        <Link href={`/${locale}`} className="mono text-sm uppercase tracking-[0.2em] text-accent-warm">
          {siteName}
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <Link href={`/${locale}#${SECTION_IDS.yerevanStory}`} className="text-sm text-text-muted transition hover:text-text">
            {navLabels.about}
          </Link>
          <Link href={`/${locale}/classes`} className="text-sm text-text-muted transition hover:text-text">
            {navLabels.classes}
          </Link>
          <Link href={`/${locale}#${SECTION_IDS.pricing}`} className="text-sm text-text-muted transition hover:text-text">
            {navLabels.pricing}
          </Link>
          <Link href={`/${locale}#${SECTION_IDS.waitlist}`} className="text-sm text-text-muted transition hover:text-text">
            {navLabels.join}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs text-text">
                <span className="mono uppercase tracking-[0.12em] text-accent-warm">{locale}</span>
              </div>
            }
          >
            <LanguageSelector locale={locale} languageNames={languageNames} label={languageSelectorLabel} />
          </Suspense>
          <Link href={`/${locale}#${SECTION_IDS.waitlist}`}>
            <Button size="sm">{ctaLabel}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
