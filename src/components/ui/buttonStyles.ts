import type { LinkStyle } from '@/types';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'outline-light';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200';

// Blanco sobre rojo (5.2:1) e ink sobre amarillo (10.8:1). Nunca blanco sobre amarillo.
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
  accent: 'bg-brand-yellow text-ink hover:bg-brand-yellow-soft',
  outline: 'border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white',
  'outline-light': 'border-2 border-white text-white hover:bg-white hover:text-brand-red',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md') =>
  `${base} ${variants[variant]} ${sizes[size]}`;

// RF2.4: jerarquía de las acciones de la navbar según site.json.
export const navActionClass = (style: LinkStyle = 'link', size: ButtonSize = 'sm') => {
  if (style === 'primary') return buttonClass('primary', size);
  if (style === 'outline') return buttonClass('outline', size);
  return 'rounded px-1 py-2 text-sm font-semibold text-ink transition-colors hover:text-brand-red';
};
