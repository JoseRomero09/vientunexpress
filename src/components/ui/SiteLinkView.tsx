import type { SiteLink } from '@/types';
import { ComingSoon } from './ComingSoon';

interface SiteLinkViewProps {
  link: SiteLink;
  className?: string;
  wrapperClassName?: string;
  placement?: 'top' | 'bottom';
  onNavigate?: () => void;
}

// Pinta un enlace de site.json según su acción.
// 'jobs' se muestra como "Próximamente" hasta que el modal de Empleo se conecte (T5).
export function SiteLinkView({ link, className, wrapperClassName, placement, onNavigate }: SiteLinkViewProps) {
  if (link.action === 'anchor') {
    return (
      <a href={link.href} className={className} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }

  if (link.action === 'external') {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return (
    <ComingSoon className={className} wrapperClassName={wrapperClassName} placement={placement}>
      {link.label}
    </ComingSoon>
  );
}
