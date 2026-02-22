"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type NavigationProps = {
  ctaLabel: string;
};

export default function Navigation({ ctaLabel }: NavigationProps) {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-bg/65 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href={pathname ?? "/en"} className="mono text-sm uppercase tracking-[0.2em] text-accent-warm">
          Studio Yerevan
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-text-muted transition hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={`#${SECTION_IDS.waitlist}`}>
          <Button size="sm">{ctaLabel}</Button>
        </a>
      </div>
    </header>
  );
}
