'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// RF12.9: framer-motion desactiva transformaciones cuando el sistema pide menos movimiento.
// Las opacidades se anulan en cada componente con useMotionSafe().
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
