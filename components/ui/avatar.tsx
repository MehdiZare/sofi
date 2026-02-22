import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-full border border-white/20", className)}>
      <Image src={src} alt={alt} fill sizes="120px" className="object-cover" />
    </div>
  );
}
