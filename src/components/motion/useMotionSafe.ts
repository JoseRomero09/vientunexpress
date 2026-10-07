'use client';

import { useReducedMotion, type Transition } from 'framer-motion';

/**
 * RF12.9. Mantiene el mismo `initial` en servidor y cliente (evita desajustes de hidratación)
 * y, si el usuario prefiere menos movimiento, convierte cada transición en instantánea
 * y apaga los loops decorativos.
 */
export function useMotionSafe() {
  const reduce = useReducedMotion() ?? false;
  return {
    reduce,
    transition: (transition: Transition): Transition => (reduce ? { duration: 0 } : transition),
  };
}
