'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { site } from '@/lib/data';
import { SiteLinkView } from '@/components/ui/SiteLinkView';
import { navActionClass } from '@/components/ui/buttonStyles';
import { Logo } from './Logo';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Drawer lateral sobre <dialog>: foco atrapado, Esc y backdrop los da el navegador.
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Menú principal"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-0 ml-auto h-dvh max-h-none w-[85vw] max-w-sm bg-surface p-0 text-ink"
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b-4 border-brand-red px-5 py-4">
          <Logo className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="grid size-10 place-items-center rounded-full hover:bg-surface-warm"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Principal" className="px-5 py-4">
          <ul className="space-y-1">
            {site.navLinks.map((link) => (
              <li key={link.label}>
                <SiteLinkView
                  link={link}
                  onNavigate={onClose}
                  className="block rounded-lg px-3 py-3 text-lg font-bold hover:bg-surface-warm hover:text-brand-red"
                />
              </li>
            ))}
          </ul>
        </nav>

        <ul className="grid gap-3 border-t border-ink/10 px-5 py-5">
          {site.navActions.map((link) => (
            <li key={link.label}>
              <SiteLinkView
                link={link}
                wrapperClassName="flex"
                className={`${navActionClass(link.style, 'md')} w-full ${link.style === 'link' || !link.style ? 'px-3' : ''}`}
              />
            </li>
          ))}
        </ul>

        <ul className="mt-auto space-y-1 bg-brand-red-dark px-5 py-4 text-sm text-white">
          {site.topbarLinks.map((link) => (
            <li key={link.label}>
              <SiteLinkView
                link={link}
                onNavigate={onClose}
                placement="top"
                className="block rounded px-3 py-2 hover:text-brand-yellow"
              />
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
