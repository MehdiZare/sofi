"use client";

import { Children, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type InfiniteMovingCardsProps = {
  children: React.ReactNode;
  className?: string;
};

export default function InfiniteMovingCards({ children, className }: InfiniteMovingCardsProps) {
  const nodes = useMemo(() => {
    const entries = Children.toArray(children);
    return [...entries, ...entries];
  }, [children]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {nodes.map((node, index) => (
          <div key={index} className="shrink-0">
            {node}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
