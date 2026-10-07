import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { site } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';

// RF7: franja amarilla con texto ink y pin rojo.
export function CoverageBanner() {
  const { coverage } = site;

  return (
    <section
      id="cobertura"
      aria-labelledby="coverage-title"
      className="relative isolate overflow-hidden bg-brand-yellow text-ink"
    >
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-brand-yellow-soft"
      />
      <div className="page-container grid items-center gap-8 py-14 md:grid-cols-[1.1fr_1fr] md:py-16">
        <Reveal className="flex flex-col gap-5 xl:flex-row xl:items-start xl:gap-7">
          <MapPin
            aria-hidden="true"
            className="size-20 shrink-0 fill-brand-red text-brand-red-dark md:size-24 [&>circle]:fill-brand-yellow"
            strokeWidth={1.5}
          />
          <div>
            <h2 id="coverage-title" className="text-3xl leading-tight font-extrabold text-balance md:text-4xl xl:text-5xl">
              {coverage.title}
            </h2>
            <p className="mt-4 max-w-lg text-lg font-medium md:text-xl">{coverage.subtitle}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto aspect-[8/5] w-full max-w-lg">
          <Image src={coverage.image.src} alt={coverage.image.alt} fill sizes="(min-width: 768px) 40vw, 90vw" />
        </Reveal>
      </div>
    </section>
  );
}
