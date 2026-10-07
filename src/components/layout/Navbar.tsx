'use client';

import { useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';
import { site } from '@/lib/data';
import { SiteLinkView } from '@/components/ui/SiteLinkView';
import { navActionClass } from '@/components/ui/buttonStyles';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // RF2.1b / RF12.7: sombra y fondo translúcido en cuanto la página deja de estar arriba.
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? 'bg-surface/90 shadow-lg shadow-ink/10 backdrop-blur-md' : 'bg-surface shadow-none'
      }`}
    >
      <div className="page-container flex h-18 items-center justify-between gap-6">
        <a href="#inicio" aria-label={`${site.brand.name} — Inicio`} className="shrink-0 rounded">
          <Logo className="h-10 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7 font-semibold">
            {site.navLinks.map((link) => (
              <li key={link.label}>
                <SiteLinkView
                  link={link}
                  className="relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-200 hover:text-brand-red hover:after:scale-x-100"
                />
              </li>
            ))}
          </ul>
        </nav>

        <ul className="hidden items-center gap-4 xl:flex">
          {site.navActions.map((link) => (
            <li key={link.label}>
              <SiteLinkView link={link} className={navActionClass(link.style)} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={drawerOpen}
          className="grid size-11 place-items-center rounded-full text-ink hover:bg-surface-warm xl:hidden"
        >
          <Menu className="size-7" aria-hidden="true" />
        </button>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
