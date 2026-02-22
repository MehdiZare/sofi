"use client";

import Link from "next/link";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, replacePathLocale, type Locale } from "@/lib/i18n";

type LanguageSelectorProps = {
  locale: Locale;
  languageNames: Record<Locale, string>;
  label: string;
};

export default function LanguageSelector({ locale, languageNames, label }: LanguageSelectorProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash ?? "");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const search = useMemo(() => {
    const value = searchParams.toString();
    return value ? `?${value}` : "";
  }, [searchParams]);

  const getHref = (targetLocale: Locale) => `${replacePathLocale(pathname, targetLocale)}${search}${hash}`;

  return (
    <>
      <nav aria-label={label} className="hidden items-center rounded-full border border-white/15 bg-black/30 p-1 md:flex">
        {locales.map((targetLocale) => (
          <Link
            key={targetLocale}
            href={getHref(targetLocale)}
            prefetch={false}
            aria-current={targetLocale === locale ? "page" : undefined}
            className={cn(
              "mono rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition",
              targetLocale === locale
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-white/10 hover:text-text"
            )}
          >
            {targetLocale.toUpperCase()}
          </Link>
        ))}
      </nav>

      <div className="md:hidden">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
          aria-label={label}
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs text-text"
        >
          <Globe className="h-4 w-4 text-accent-warm" />
          <span>{languageNames[locale]}</span>
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </button>

        {mobileOpen ? (
          <div className="fixed inset-0 z-[70] bg-black/65" onClick={() => setMobileOpen(false)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/15 bg-surface p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="mono mb-3 text-xs uppercase tracking-[0.14em] text-accent-warm">{label}</p>
              <div className="space-y-2">
                {locales.map((targetLocale) => (
                  <Link
                    key={targetLocale}
                    href={getHref(targetLocale)}
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-4 py-3",
                      targetLocale === locale
                        ? "border-primary/70 bg-primary/15 text-text"
                        : "border-white/10 bg-surface-elevated text-text-muted"
                    )}
                  >
                    <span className="text-sm">{languageNames[targetLocale]}</span>
                    {targetLocale === locale ? <Check className="h-4 w-4 text-accent-warm" /> : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
