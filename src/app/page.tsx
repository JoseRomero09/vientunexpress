import { site } from '@/lib/data';

// Muestra temporal de paleta y tipografía (T1). Se reemplaza por las secciones en T3.
const swatches = [
  { name: 'brand-dark', className: 'bg-brand-dark' },
  { name: 'brand-dark-2', className: 'bg-brand-dark-2' },
  { name: 'brand-green', className: 'bg-brand-green' },
  { name: 'brand-green-hover', className: 'bg-brand-green-hover' },
  { name: 'brand-lime', className: 'bg-brand-lime' },
  { name: 'surface', className: 'bg-surface ring-1 ring-brand-dark/20' },
  { name: 'surface-muted', className: 'bg-surface-muted' },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-4xl font-extrabold">{site.brand.name}</h1>
      <p className="mt-2 text-lg">{site.brand.slogan}</p>
      <p className="mt-2 text-lg text-brand-lime bg-brand-dark inline-block px-2">{site.smartDelivery.tagline}</p>

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
