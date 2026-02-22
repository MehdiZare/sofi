import { cn } from "@/lib/utils";

type BackgroundBeamsProps = {
  className?: string;
};

export default function BackgroundBeams({ className }: BackgroundBeamsProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "[mask-image:radial-gradient(circle_at_center,black,transparent_80%)]",
        className
      )}
    >
      <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-accent-warm/20 blur-3xl" />
      <div className="absolute bottom-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
    </div>
  );
}
