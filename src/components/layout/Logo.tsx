import { site } from '@/lib/data';

interface LogoProps {
  className?: string;
  /** 'onLight': "Express" en ink · 'onDark': "Express" en blanco (fondos rojos) */
  tone?: 'onLight' | 'onDark';
}

// Logotipo propio: hexágono rojo con "21" amarillo + "Express".
export function Logo({ className = 'h-10 w-auto', tone = 'onLight' }: LogoProps) {
  const wordColor = tone === 'onLight' ? 'var(--color-ink)' : '#FFFFFF';
  const hexStroke = tone === 'onLight' ? 'none' : 'var(--color-brand-yellow)';

  return (
    <svg viewBox="0 0 176 44" className={className} role="img" aria-label={site.brand.name}>
      <polygon
        points="22,2 41,13 41,31 22,42 3,31 3,13"
        fill="var(--color-brand-red)"
        stroke={hexStroke}
        strokeWidth="2"
      />
      <text
        x="22"
        y="29.5"
        textAnchor="middle"
        fill="var(--color-brand-yellow)"
        fontFamily="var(--font-montserrat), sans-serif"
        fontSize="19"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        21
      </text>
      <text
        x="50"
        y="30"
        fill={wordColor}
        fontFamily="var(--font-montserrat), sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="-0.3"
      >
        Express
      </text>
    </svg>
  );
}
