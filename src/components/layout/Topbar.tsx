import { site } from '@/lib/data';
import { SiteLinkView } from '@/components/ui/SiteLinkView';
import { CountrySwitcher } from './CountrySwitcher';
import { SocialLinks } from './SocialLinks';

export function Topbar() {
  return (
    <div className="relative z-50 bg-brand-red-dark text-xs text-white">
      <div className="page-container flex h-8 items-center justify-between gap-4">
        {/* El eslogan solo aparece donde cabe completo (640–767 px y ≥1280 px); nunca truncado */}
        <p className="hidden min-w-0 truncate text-white/90 sm:block md:hidden xl:block">{site.brand.slogan}</p>

        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
          <nav aria-label="Enlaces secundarios" className="hidden md:block">
            <ul className="flex items-center gap-5">
              {site.topbarLinks.map((link) => (
                <li key={link.label}>
                  <SiteLinkView link={link} className="transition-colors hover:text-brand-yellow" />
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="hidden h-3.5 w-px bg-white/30 md:block" />
          <CountrySwitcher />
          <SocialLinks iconClassName="size-3.5" />
        </div>
      </div>
    </div>
  );
}
