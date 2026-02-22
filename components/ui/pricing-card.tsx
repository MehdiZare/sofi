"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  name: string;
  price: string;
  regularPrice: string;
  commitment: string;
  perks: string;
  cta: string;
  featured?: boolean;
};

export default function PricingCard({
  name,
  price,
  regularPrice,
  commitment,
  perks,
  cta,
  featured
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="h-full"
    >
      <Card
        className={cn(
          "flex h-full flex-col gap-5",
          featured
            ? "border-primary/80 bg-gradient-to-b from-primary/15 via-surface to-surface shadow-[0_24px_50px_rgba(200,85,61,0.25)]"
            : ""
        )}
      >
        {featured ? <Badge className="w-fit">Most Popular</Badge> : null}
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="mt-2 text-3xl font-extrabold text-text">{price}</p>
          <p className="mt-1 text-sm text-text-muted">Regular: {regularPrice}</p>
        </div>

        <dl className="space-y-2 text-sm text-text-muted">
          <div>
            <dt className="mono text-xs uppercase tracking-[0.16em]">Commitment</dt>
            <dd>{commitment}</dd>
          </div>
          <div>
            <dt className="mono text-xs uppercase tracking-[0.16em]">Perks</dt>
            <dd>{perks}</dd>
          </div>
        </dl>

        <a href="#waitlist" className="mt-auto block">
          <Button size="lg" className="w-full">
            {cta}
          </Button>
        </a>
      </Card>
    </motion.div>
  );
}
