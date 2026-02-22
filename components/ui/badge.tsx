import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "mono inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-accent-warm",
        className
      )}
    >
      {children}
    </span>
  );
}
