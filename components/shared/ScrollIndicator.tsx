"use client";

import { ChevronDown } from "lucide-react";

type ScrollIndicatorProps = {
  label: string;
};

export default function ScrollIndicator({ label }: ScrollIndicatorProps) {
  return (
    <div className="flex animate-subtle-float flex-col items-center gap-2 text-text-muted">
      <span className="mono text-xs uppercase tracking-[0.2em]">{label}</span>
      <ChevronDown className="h-5 w-5" />
    </div>
  );
}
