import { Topbar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrackingBar } from '@/components/sections/TrackingBar';
import { Hero } from '@/components/sections/Hero';
import { ServicesSplit } from '@/components/sections/ServicesSplit';
import { SmartDelivery } from '@/components/sections/SmartDelivery';
import { CoverageBanner } from '@/components/sections/CoverageBanner';
import { BranchLocator } from '@/components/sections/BranchLocator';
import { WhatsAppButton } from '@/components/WhatsAppButton';

// Orden de la página según spec §4. Topbar y Navbar son hijos directos de <body>
// para que la navbar pueda ser sticky en todo el recorrido.
// La tarjeta de rastreo va después del Hero y sube sobre su borde inferior (RF3.1).
export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main>
        <Hero />
        <div className="bg-surface-warm">
          <TrackingBar />
        </div>
        <ServicesSplit />
        <SmartDelivery />
        <CoverageBanner />
        <BranchLocator />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
