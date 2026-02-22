import { Card } from "@/components/ui/card";

type TestimonialCardProps = {
  quote: string;
  author: string;
};

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <Card className="h-full min-w-[280px] max-w-sm space-y-4 bg-surface-elevated/60">
      <p className="text-base leading-relaxed text-text">“{quote}”</p>
      <p className="mono text-xs uppercase tracking-[0.16em] text-text-muted">{author}</p>
    </Card>
  );
}
