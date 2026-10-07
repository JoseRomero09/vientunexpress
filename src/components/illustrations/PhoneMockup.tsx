interface PhoneMockupProps {
  label: string;
  className?: string;
}

// RF6.2: mockup propio de la app de rastreo (ruta + estado del envío). Colores = tokens de marca.
export function PhoneMockup({ label, className }: PhoneMockupProps) {
  return (
    <svg viewBox="0 0 260 520" role="img" aria-label={label} className={className}>
      {/* Carcasa */}
      <rect x="4" y="4" width="252" height="512" rx="40" fill="var(--color-ink)" />
      <rect x="16" y="16" width="228" height="488" rx="30" fill="var(--color-surface)" />
      <rect x="95" y="26" width="70" height="16" rx="8" fill="var(--color-ink)" />

      {/* Barra superior de la app */}
      <rect x="16" y="52" width="228" height="56" fill="var(--color-brand-red)" />
      <polygon points="44,64 56,71 56,87 44,94 32,87 32,71" fill="var(--color-brand-yellow)" />
      <rect x="66" y="72" width="90" height="8" rx="4" fill="var(--color-surface)" />
      <rect x="66" y="86" width="56" height="6" rx="3" fill="var(--color-surface)" opacity="0.7" />

      {/* Mapa con ruta */}
      <rect x="30" y="122" width="200" height="200" rx="18" fill="var(--color-surface-warm)" />
      <path d="M30 220 H230 M130 122 V322 M30 170 L230 270" stroke="var(--color-brand-yellow-soft)" strokeWidth="10" />
      <path
        d="M62 290 C92 250 80 210 120 196 S176 160 190 148"
        fill="none"
        stroke="var(--color-brand-red)"
        strokeWidth="6"
        strokeDasharray="10 9"
        strokeLinecap="round"
      />
      <circle cx="62" cy="290" r="10" fill="var(--color-ink)" />
      <path d="M190 116 a20 20 0 0 1 20 20 c0 15 -20 34 -20 34 s-20 -19 -20 -34 a20 20 0 0 1 20 -20z" fill="var(--color-brand-red)" />
      <circle cx="190" cy="136" r="7" fill="var(--color-brand-yellow)" />

      {/* Tarjeta de estado */}
      <rect x="30" y="338" width="200" height="72" rx="16" fill="var(--color-brand-yellow)" />
      <circle cx="58" cy="374" r="14" fill="var(--color-ink)" />
      <path d="M51 374 l5 5 9 -10" fill="none" stroke="var(--color-brand-yellow)" strokeWidth="3" strokeLinecap="round" />
      <rect x="82" y="360" width="110" height="9" rx="4.5" fill="var(--color-ink)" />
      <rect x="82" y="378" width="76" height="7" rx="3.5" fill="var(--color-ink)" opacity="0.55" />

      {/* Línea de tiempo */}
      {[426, 452, 478].map((y, index) => (
        <g key={y}>
          <circle cx="44" cy={y} r="6" fill={index === 0 ? 'var(--color-brand-red)' : 'var(--color-ink-muted)'} />
          <rect x="60" y={y - 4} width={index === 0 ? 130 : 100 - index * 12} height="8" rx="4" fill="var(--color-ink)" opacity={index === 0 ? 0.8 : 0.3} />
        </g>
      ))}
    </svg>
  );
}
