'use client';

import { motion } from 'framer-motion';
import { site } from '@/lib/data';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { useMotionSafe } from '@/components/motion/useMotionSafe';

// RF11 con el verde oficial de WhatsApp (única excepción a la paleta) y pulso cada 5 s (RF12.8).
// Los <dialog> modales viven en la capa superior del navegador, así que lo tapan (RF11.3).
export function WhatsAppButton() {
  const { number, message } = site.contact.whatsapp;
  const { reduce } = useMotionSafe();

  return (
    <a
      href={buildWhatsAppUrl(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-ink/30 transition-transform duration-200 hover:scale-105 md:right-6 md:bottom-6 md:size-16"
    >
      {/* Mismo `animate` en servidor y cliente; con movimiento reducido el pulso no se repite */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-whatsapp"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: 'easeOut', repeat: Infinity, repeatDelay: 4.4 }}
      />
      <WhatsAppIcon className="relative size-8 md:size-9" />
    </a>
  );
}
