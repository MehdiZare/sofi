import { cn } from "@/lib/utils";

type MovingBorderProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MovingBorder({ children, className }: MovingBorderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 before:absolute before:-inset-[1px] before:-z-10 before:rounded-[inherit] before:bg-[conic-gradient(from_90deg,var(--color-primary),transparent_30%,var(--color-accent-warm),transparent_60%,var(--color-primary))] before:opacity-40",
        className
      )}
    >
      {children}
    </div>
  );
}
