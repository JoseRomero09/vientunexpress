'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { site } from '@/lib/data';

export function CountrySwitcher() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 rounded px-1 py-0.5 font-medium text-white transition-colors hover:text-brand-yellow"
      >
        Cambiar país
        <ChevronRight className={`size-3.5 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl bg-surface py-1 text-sm text-ink shadow-xl ring-1 ring-ink/10"
        >
          {site.countries.map((country) =>
            country.status === 'active' ? (
              <li key={country.code}>
                <span
                  aria-current="true"
                  className="flex items-center justify-between px-4 py-2.5 font-semibold"
                >
                  {country.name}
                  <Check className="size-4 text-brand-red" aria-hidden="true" />
                </span>
              </li>
            ) : (
              <li key={country.code}>
                <span
                  aria-disabled="true"
                  className="flex items-center justify-between px-4 py-2.5 text-ink-muted"
                >
                  {country.name}
                  <span className="rounded-full bg-brand-yellow-soft px-2 py-0.5 text-xs font-medium text-ink">
                    {site.comingSoonLabel}
                  </span>
                </span>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
