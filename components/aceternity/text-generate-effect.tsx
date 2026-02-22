"use client";

import { motion } from "framer-motion";

type TextGenerateEffectProps = {
  words: string;
  className?: string;
};

export default function TextGenerateEffect({ words, className }: TextGenerateEffectProps) {
  return (
    <p className={className}>
      {words.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="mr-2 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
