import type { Metadata } from 'next';
import { site } from '@/lib/data';

// Ruta interna para revisar tokens de diseño. No forma parte de la landing ni se indexa.
export const metadata: Metadata = {
  title: 'Guía de estilos | 21 Express',
  robots: { index: false, follow: false },
};

const swatches = [
  { name: 'brand-red', className: 'bg-brand-red' },
  { name: 'brand-red-dark', className: 'bg-brand-red-dark' },
  { name: 'brand-yellow', className: 'bg-brand-yellow' },
  { name: 'brand-yellow-soft', className: 'bg-brand-yellow-soft' },
  { name: 'surface', className: 'bg-surface ring-1 ring-ink/20' },
  { name: 'surface-warm', className: 'bg-surface-warm ring-1 ring-ink/10' },
  { name: 'ink', className: 'bg-ink' },
  { name: 'ink-muted', className: 'bg-ink-muted' },
];

export default function StyleguidePage() {
  return (
    <main className="page-container py-12">
      <h1 className="font-heading text-4xl font-extrabold">{site.brand.name}</h1>
      <p className="mt-2 text-lg">{site.brand.slogan}</p>
      <p className="mt-2 inline-block bg-brand-red px-2 text-lg text-white">{site.smartDelivery.tagline}</p>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {swatches.map((swatch) => (
          <li key={swatch.name}>
            <div className={`h-16 rounded-lg ${swatch.className}`} />
            <code className="mt-1 block text-sm">{swatch.name}</code>
          </li>
        ))}
      </ul>
    </main>
  );
}
