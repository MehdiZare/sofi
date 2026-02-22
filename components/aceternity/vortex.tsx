import { cn } from "@/lib/utils";

type VortexProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Vortex({ children, className }: VortexProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,85,61,0.35),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(212,165,116,0.24),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_40%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
