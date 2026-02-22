import { cn } from "@/lib/utils";

type BackgroundGradientProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BackgroundGradient({ children, className }: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-accent-warm/10 p-[1px]",
        className
      )}
    >
      <div className="rounded-[calc(1.5rem-1px)] bg-surface/85">{children}</div>
    </div>
  );
}
