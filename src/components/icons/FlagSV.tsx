import type { SVGProps } from 'react';

// Colores oficiales de la bandera: excepción justificada a la regla de tokens de marca.
export function FlagSV(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#0047AB" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <circle cx="15" cy="10" r="2" fill="none" stroke="#C8A600" strokeWidth="0.8" />
    </svg>
  );
}
