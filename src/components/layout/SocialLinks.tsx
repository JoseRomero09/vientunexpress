import type { SocialLink } from '@/types';
import { site } from '@/lib/data';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';

const icons: Record<SocialLink['id'], typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

interface SocialLinksProps {
  iconClassName?: string;
  align?: 'start' | 'end';
  linkClassName?: string;
  placement?: 'top' | 'bottom';
}

export function SocialLinks({
  iconClassName = 'size-4',
  linkClassName = 'grid place-items-center rounded-full p-1.5 text-white transition-colors hover:text-brand-yellow',
  placement,
  align = 'end',
}: SocialLinksProps) {
  return (
    <ul className="flex items-center gap-1">
      {site.social.map((social) => {
        const Icon = icons[social.id];
        return (
          <li key={social.id}>
            {social.comingSoon ? (
              <ComingSoon className={linkClassName} ariaLabel={social.label} placement={placement} align={align}>
                <Icon className={iconClassName} />
              </ComingSoon>
            ) : (
              <a
                href={social.url}
                className={linkClassName}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className={iconClassName} />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
