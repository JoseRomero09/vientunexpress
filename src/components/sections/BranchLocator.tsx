'use client';

import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import { branches, site } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { BranchCard } from './BranchCard';

const BranchMap = dynamic(() => import('./BranchMap'), {
  ssr: false,
  loading: () => (
    <div role="status" className="grid h-full place-items-center bg-surface text-ink-muted">
      {site.branchesSection.mapLoading}
    </div>
  ),
});

// UI de RF8. El filtro, la tarjeta activa y el vuelo del mapa se conectan en T9.
export function BranchLocator() {
  const content = site.branchesSection;

  return (
    <section id="sucursales" aria-labelledby="branches-title" className="bg-surface-warm py-20 md:py-24">
      <div className="page-container">
        <Reveal className="max-w-2xl">
          <h2 id="branches-title" className="text-3xl font-extrabold md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-lg text-ink-muted">{content.intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-6 md:grid-cols-[minmax(0,22rem)_1fr] lg:grid-cols-[minmax(0,26rem)_1fr]">
          {/* Mapa: arriba en móvil, a la derecha desde 768 px (RF8.8) */}
          <div className="relative isolate z-0 h-80 overflow-hidden rounded-2xl shadow-lg shadow-ink/10 ring-1 ring-ink/10 md:order-2 md:h-[560px]">
            <BranchMap branches={branches} />
          </div>

          {/* min-w-0: sin él, la columna del grid crece al ancho de todo el carrusel */}
          <div className="flex min-h-0 min-w-0 flex-col md:order-1 md:h-[560px]">
            <label htmlFor="branch-search" className="text-sm font-semibold">
              {content.searchLabel}
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-full bg-surface px-4 ring-1 ring-ink/15 focus-within:ring-2 focus-within:ring-brand-red">
              <Search className="size-5 shrink-0 text-ink-muted" aria-hidden="true" />
              <input
                id="branch-search"
                type="search"
                autoComplete="off"
                placeholder={content.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent py-3 placeholder:text-ink-muted focus:outline-none"
              />
            </div>
            <p className="mt-3 text-sm text-ink-muted" aria-live="polite">
              {content.results.replace('{count}', String(branches.length))}
            </p>

            {/* Celular: carrusel horizontal con la siguiente tarjeta asomando. ≥768 px: lista vertical con scroll */}
            <ul
              aria-label={content.title}
              className="-mx-[clamp(1rem,4vw,2rem)] mt-3 flex snap-x snap-mandatory scroll-px-[clamp(1rem,4vw,2rem)] gap-3 overflow-x-auto px-[clamp(1rem,4vw,2rem)] py-2 md:mx-0 md:block md:flex-1 md:snap-none md:space-y-3 md:overflow-x-visible md:overflow-y-auto md:px-0 md:py-1 md:pr-1"
            >
              {branches.map((branch) => (
                <li key={branch.id} className="w-[85%] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none">
                  <BranchCard branch={branch} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
