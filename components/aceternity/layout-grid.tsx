import Image from "next/image";

type LayoutGridItem = {
  src: string;
  alt: string;
};

type LayoutGridProps = {
  items: LayoutGridItem[];
};

export default function LayoutGrid({ items }: LayoutGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
          <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
        </div>
      ))}
    </div>
  );
}
