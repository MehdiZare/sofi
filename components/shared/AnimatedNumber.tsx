"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  className?: string;
};

export default function AnimatedNumber({ value, duration = 1.8, className }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut"
    });

    return () => controls.stop();
  }, [duration, motionValue, value]);

  return (
    <motion.span className={className}>
      {rounded}
    </motion.span>
  );
}
