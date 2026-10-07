'use client';

import { Search } from 'lucide-react';
import { buttonClass } from '@/components/ui/buttonStyles';

// RF6.5: lleva a la barra de rastreo y deja el cursor en el input.
export function TrackShipmentButton({ label }: { label: string }) {
  const goToTracking = () => {
    const input = document.getElementById('tracking-input');
    if (!input) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    input.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
  };

  return (
    <button type="button" onClick={goToTracking} className={buttonClass('primary', 'lg')}>
      <Search className="size-5" aria-hidden="true" />
      {label}
    </button>
  );
}
