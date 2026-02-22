import Badge from "@/components/ui/badge";

type SectionHeaderProps = {
  badge?: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <header className="mx-auto mb-10 max-w-3xl space-y-4 text-center md:mb-14">
      {badge ? <Badge>{badge}</Badge> : null}
      <h2 className="text-balance text-4xl font-extrabold md:text-5xl">{title}</h2>
      {description ? <p className="text-pretty text-lg text-text-muted">{description}</p> : null}
    </header>
  );
}
