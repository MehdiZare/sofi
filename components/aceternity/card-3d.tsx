import { cn } from "@/lib/utils";

export function CardContainer({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("group perspective-[1000px]", className)}>{children}</div>;
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-full transform-gpu rounded-3xl transition duration-500 group-hover:[transform:rotateX(3deg)_rotateY(-4deg)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(className)}>{children}</div>;
}
