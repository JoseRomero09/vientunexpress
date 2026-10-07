'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { site } from '@/lib/data';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { buttonClass } from '@/components/ui/buttonStyles';
import { useMotionSafe } from '@/components/motion/useMotionSafe';

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const { hero } = site;
  const { reduce, transition } = useMotionSafe();

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-brand-red text-white">
      {/* Patrón diagonal sutil + halo amarillo detrás de la ilustración */}
      <div aria-hidden="true" className="diagonal-pattern absolute inset-0 -z-10 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -z-10 hidden size-[34rem] -translate-y-1/2 rounded-full bg-brand-red-dark/50 md:block"
      />

      {/* pb extra: la tarjeta de rastreo (RF3) monta sobre el borde inferior (RF4.5) */}
      <div className="page-container grid items-center gap-10 pt-10 pb-32 md:grid-cols-[1.1fr_1fr] md:pt-20 md:pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={transition({ staggerChildren: 0.1 })}
          className="max-w-2xl"
        >
          <motion.h1
            variants={item}
            transition={transition({ duration: 0.5, ease: 'easeOut' })}
            className="text-4xl leading-[1.1] font-extrabold text-balance sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </motion.h1>
          <motion.span
            variants={item}
            transition={transition({ duration: 0.5, ease: 'easeOut' })}
            aria-hidden="true"
            className="mt-6 block h-1.5 w-24 rounded-full bg-brand-yellow"
          />
          <motion.p
            variants={item}
            transition={transition({ duration: 0.5, ease: 'easeOut' })}
            className="mt-6 max-w-xl text-lg text-white/95 md:text-xl"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div variants={item} transition={transition({ duration: 0.5, ease: 'easeOut' })} className="mt-8">
            <ComingSoon className={buttonClass('accent', 'lg')}>{hero.cta}</ComingSoon>
          </motion.div>
        </motion.div>

        {/* RF12.3: flotación suave en loop (y ±8 px, 4 s). `animate` es igual en servidor y
            cliente para no desajustar la hidratación; con movimiento reducido solo cambia la transición. */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={reduce ? { duration: 0 } : { duration: 4, ease: 'easeInOut', repeat: Infinity }}
          className="relative mx-auto -mt-2 aspect-[7/6] w-full max-w-[16rem] sm:max-w-sm md:mt-0 md:max-w-none"
        >
          <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width: 768px) 45vw, 90vw" />
        </motion.div>
      </div>
    </section>
  );
}
