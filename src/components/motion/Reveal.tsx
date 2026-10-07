'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionSafe } from './useMotionSafe';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// RF12.4: fade-up al entrar en el viewport, una sola vez.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { transition } = useMotionSafe();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={transition({ duration: 0.5, ease: 'easeOut', delay })}
    >
      {children}
    </motion.div>
  );
}
