import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '21 Express | Paquetería en El Salvador',
  description:
    'Envíos nacionales e internacionales con rastreo en tiempo real y sucursales en todo El Salvador.',
  openGraph: {
    title: '21 Express',
    description:
      'Envíos nacionales e internacionales con rastreo en tiempo real y sucursales en todo El Salvador.',
    locale: 'es_SV',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-SV" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-surface font-sans text-brand-dark antialiased">{children}</body>
    </html>
  );
}
