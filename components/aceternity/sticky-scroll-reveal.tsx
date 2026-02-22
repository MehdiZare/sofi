"use client";

import { motion } from "framer-motion";

type StickyScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export default function StickyScrollReveal({ children, className }: StickyScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
