'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';
import type { Branch } from '@/types';
import { useMotionSafe } from '@/components/motion/useMotionSafe';

interface BranchCardProps {
  branch: Branch;
  active?: boolean;
}

// RF8.5: la tarjeta activa lleva borde izquierdo rojo (la selección se conecta en T9).
export function BranchCard({ branch, active = false }: BranchCardProps) {
  const { transition } = useMotionSafe();

  return (
    <motion.article
      whileHover={{ y: -3, scale: 1.02 }}
      transition={transition({ duration: 0.2, ease: 'easeOut' })}
      className={`flex gap-4 rounded-xl border-l-4 bg-surface p-3 shadow-sm shadow-ink/5 ring-1 ring-ink/5 transition-shadow duration-200 hover:shadow-lg hover:shadow-ink/10 ${
        active ? 'border-brand-red' : 'border-transparent'
      }`}
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-surface-warm sm:h-20 sm:w-28">
        <Image src={branch.image.src} alt={branch.image.alt} fill sizes="112px" className="object-cover" />
      </div>
      <div className="min-w-0 text-sm">
        <h3 className="font-heading text-base font-bold">{branch.name}</h3>
        <p className="mt-1 flex gap-1.5 text-ink-muted">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
          <span>
            {branch.address}, {branch.municipality}, {branch.department}
          </span>
        </p>
        <p className="mt-1 flex gap-1.5 text-ink-muted">
          <Clock className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
          {branch.schedule}
        </p>
        <p className="mt-1 flex gap-1.5">
          <Phone className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
          <a href={`tel:+503${branch.phone.replace('-', '')}`} className="font-semibold hover:text-brand-red hover:underline">
            {branch.phone}
          </a>
        </p>
      </div>
    </motion.article>
  );
}
