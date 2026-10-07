import { Clock, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/data';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { SiteLinkView } from '@/components/ui/SiteLinkView';
import { buttonClass } from '@/components/ui/buttonStyles';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { FlagSV } from '@/components/icons/FlagSV';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';

const flags = { SV: FlagSV } as const;

export function Footer() {
  const { footer, contact } = site;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsapp.number, contact.whatsapp.message);
  const coverage = site.countries.filter((country) => site.coverageCountries.includes(country.code));

  return (
    <footer id="contacto" className="border-t-8 border-brand-yellow bg-brand-red-dark text-white">
      <div className="page-container grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1.4fr_1fr]">
        {/* Marca */}
        <div className="col-span-2 space-y-5 sm:col-span-1">
          <Logo className="h-11 w-auto" tone="onDark" />
          <p className="max-w-xs text-white/90">{site.brand.slogan}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('accent', 'md')}
          >
            <WhatsAppIcon className="size-5" />
            {contact.phone}
          </a>
          <SocialLinks iconClassName="size-5" placement="top" align="start" />
        </div>

        {/* Compañía */}
        <nav aria-labelledby="footer-company" className="col-span-2 sm:col-span-1">
          <h2 id="footer-company" className="text-lg font-bold text-brand-yellow">
            {footer.companyTitle}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-white/90 sm:block sm:space-y-2.5">
            {footer.companyLinks.map((link) => (
              <li key={link.label}>
                <SiteLinkView link={link} placement="top" className="transition-colors hover:text-brand-yellow" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Contáctanos */}
        <div className="col-span-2 sm:col-span-1">
          <h2 className="text-lg font-bold text-brand-yellow">{footer.contactTitle}</h2>
          <ul className="mt-4 space-y-3 text-white/90">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-yellow" aria-hidden="true" />
              <a href={contact.phoneHref} className="hover:text-brand-yellow">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-brand-yellow" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow">
                WhatsApp
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-yellow" aria-hidden="true" />
              <address className="not-italic">{contact.address}</address>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand-yellow" aria-hidden="true" />
              {contact.schedule}
            </li>
          </ul>
        </div>

        {/* Cobertura */}
        <div className="col-span-2 sm:col-span-1">
          <h2 className="text-lg font-bold text-brand-yellow">{footer.coverageTitle}</h2>
          <ul className="mt-4 space-y-3">
            {coverage.map((country) => {
              const Flag = flags[country.code as keyof typeof flags];
              return (
                <li key={country.code} className="flex items-center gap-3 text-white">
                  {Flag && <Flag className="h-5 w-auto rounded-sm ring-1 ring-white/20" />}
                  {country.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        {/* pr extra: el botón flotante de WhatsApp no tapa los enlaces legales */}
        <div className="page-container flex flex-col gap-3 py-6 pr-20 text-sm text-white/85 md:flex-row md:items-center md:justify-between md:pr-28">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legalLinks.map((link) => (
              <li key={link.label}>
                <SiteLinkView link={link} placement="top" className="hover:text-brand-yellow" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
