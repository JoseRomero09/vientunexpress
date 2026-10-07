'use client';

import { PackageSearch, Search } from 'lucide-react';
import { site } from '@/lib/data';

// RF3: tarjeta flotante sobre el borde inferior del Hero.
// La validación, el shake de error (RF12.6) y el modal de resultado se conectan en T6.
export function TrackingBar() {
  const { tracking } = site;

  return (
    <section aria-label="Rastreo de envíos" className="relative z-10 -mt-20 md:-mt-24">
      <div className="page-container">
        <form
          noValidate
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border-t-4 border-brand-yellow bg-surface p-5 shadow-2xl shadow-ink/20 md:flex-row md:items-center md:gap-6 md:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-red text-white">
              <PackageSearch className="size-6" aria-hidden="true" />
            </span>
            <label htmlFor="tracking-input" className="font-heading text-base font-extrabold md:text-lg">
              {tracking.label}
            </label>
          </div>
          <div className="flex w-full flex-1 overflow-hidden rounded-full bg-surface-warm ring-1 ring-ink/15 focus-within:ring-2 focus-within:ring-brand-red">
            <input
              id="tracking-input"
              name="guide"
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder={tracking.placeholder}
              className="min-w-0 flex-1 bg-transparent px-5 py-3.5 font-mono text-sm tracking-wide uppercase placeholder:normal-case placeholder:text-ink-muted focus:outline-none"
            />
            <button
              type="submit"
              aria-label={tracking.buttonLabel}
              className="grid w-16 shrink-0 place-items-center bg-brand-yellow text-ink transition-colors hover:bg-brand-yellow-soft"
            >
              <Search className="size-5" aria-hidden="true" strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
