'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { site } from '@/lib/data';

interface ComingSoonProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  ariaLabel?: string;
  placement?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
}

const alignClasses = {
  start: 'left-0', // para disparadores pegados al borde izquierdo
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0', // para disparadores pegados al borde derecho
};

// Enlace a una página que aún no existe: no navega y avisa "Próximamente".
export function ComingSoon({
  children,
  className,
  wrapperClassName = 'inline-flex',
  ariaLabel,
  placement = 'bottom',
  align = 'center',
}: ComingSoonProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  const show = () => {
    window.clearTimeout(hideTimer.current);
    setOpen(true);
  };
  const hide = () => setOpen(false);

  return (
    <span className={`relative ${wrapperClassName}`}>
      <a
        href="#"
        className={className}
        aria-label={ariaLabel}
        aria-describedby={tooltipId}
        onClick={(event) => {
          event.preventDefault();
          show();
          hideTimer.current = window.setTimeout(hide, 1800);
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </a>
      {/* Cerrado = display:none: oculto, sigue ocupando espacio y provocaría scroll horizontal en los bordes */}
      <span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-ink shadow-lg ${
          alignClasses[align]
        } ${placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} ${open ? 'block' : 'hidden'}`}
      >
        {site.comingSoonLabel}
      </span>
    </span>
  );
}
