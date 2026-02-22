export const locales = ["en", "hy", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(input?: string | null): Locale {
  if (!input) {
    return defaultLocale;
  }

  const normalized = input.toLowerCase();
  const exact = locales.find((locale) => locale === normalized);

  if (exact) {
    return exact;
  }

  if (normalized.startsWith("hy")) {
    return "hy";
  }

  if (normalized.startsWith("ru")) {
    return "ru";
  }

  return defaultLocale;
}

export function replacePathLocale(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = normalized.split("/");

  if (segments.length > 1 && isLocale(segments[1] ?? "")) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  if (normalized === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}
