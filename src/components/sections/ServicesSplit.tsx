'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Truck, type LucideIcon } from 'lucide-react';
import type { ServiceBlock } from '@/types';
import { site } from '@/lib/data';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { buttonClass, type ButtonVariant } from '@/components/ui/buttonStyles';
import { Reveal } from '@/components/motion/Reveal';
import { useMotionSafe } from '@/components/motion/useMotionSafe';

interface ServiceCardProps {
  service: ServiceBlock;
  icon: LucideIcon;
  badgeClass: string;
  ctaVariant: ButtonVariant;
}

function ServiceCard({ service, icon: Icon, badgeClass, ctaVariant }: ServiceCardProps) {
  const { transition } = useMotionSafe();
  const words = service.title.split(' ');
  const lastWord = words.pop();
  const leadingWords = words.join(' ');

  return (
    <motion.article
      id={service.id}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={transition({ duration: 0.25, ease: 'easeOut' })}
      className="group relative flex h-full flex-col items-start gap-5 overflow-hidden rounded-3xl bg-surface p-7 shadow-md shadow-ink/5 ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/15 sm:p-8 lg:p-10"
    >
      {/* Esquina decorativa */}
      <span
        aria-hidden="true"
        className="absolute -top-10 -right-10 size-32 rounded-full bg-brand-yellow-soft/60 transition-transform duration-300 group-hover:scale-125"
      />
      <span className={`relative grid size-16 place-items-center rounded-2xl ${badgeClass}`}>
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <h2 className="relative text-3xl font-extrabold lg:text-4xl">
        {leadingWords && `${leadingWords} `}
        {/* Última palabra + flecha juntas: la flecha nunca cae sola a otra línea */}
        <span className="whitespace-nowrap">
          {lastWord}
          <ArrowRight
            className="ml-2 inline size-7 align-[-0.12em] text-brand-red transition-transform duration-300 group-hover:translate-x-2 lg:ml-3 lg:size-8"
            aria-hidden="true"
          />
        </span>
      </h2>
      <p className="relative max-w-md text-lg text-ink-muted">{service.text}</p>
      <div className="relative mt-auto pt-2">
        <ComingSoon className={buttonClass(ctaVariant, 'lg')}>{service.cta}</ComingSoon>
      </div>
    </motion.article>
  );
}

export function ServicesSplit() {
  const { national, international } = site.services;

  return (
    <section aria-label="Servicios" className="bg-surface-warm pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="page-container grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal>
          <ServiceCard service={national} icon={Truck} badgeClass="bg-brand-red text-white" ctaVariant="primary" />
        </Reveal>
        <Reveal delay={0.1}>
          <ServiceCard service={international} icon={Globe2} badgeClass="bg-brand-yellow text-ink" ctaVariant="accent" />
        </Reveal>
      </div>
    </section>
  );
}
