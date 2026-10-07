// ---------- Rastreo ----------
export type GuideStatus = 'delivered' | 'out_for_delivery' | 'in_warehouse';

export interface GuideEvent {
  date: string; // ISO 8601 con zona, p. ej. "2026-10-02T14:35:00-06:00"
  location: string;
  description: string;
}

export interface Guide {
  id: string; // ^[A-Z]{6}-\d{2}-\d{10}$
  status: GuideStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string; // ISO date "2026-10-02"
  events: GuideEvent[]; // del más reciente al más antiguo
}

// ---------- Sucursales ----------
export interface ImageRef {
  src: string;
  alt: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  department: string;
  municipality: string;
  schedule: string;
  phone: string; // formato visible "7641-6944"
  lat: number;
  lng: number;
  image: ImageRef;
}

// ---------- Sitio ----------
export type LinkAction = 'anchor' | 'soon' | 'jobs' | 'external';

export interface SiteLink {
  label: string;
  href: string;
  action: LinkAction;
}

export interface SocialLink {
  id: 'facebook' | 'instagram';
  label: string;
  url: string;
  comingSoon: boolean;
}

export type CountryCode = 'SV' | 'GT' | 'HN';

export interface Country {
  code: CountryCode;
  name: string;
  status: 'active' | 'soon';
}

export type BenefitIcon = 'radar' | 'bell' | 'route';

export interface ServiceBlock {
  id: string;
  title: string;
  text: string;
  cta: string;
}

export type JobLabelKey =
  | 'fullName'
  | 'phone1'
  | 'phone2'
  | 'position'
  | 'zone'
  | 'cv'
  | 'submit'
  | 'optional';

export type JobErrorKey = 'fullName' | 'phone' | 'required' | 'cvType' | 'cvSize';

export interface SiteConfig {
  brand: { name: string; slogan: string };
  contact: {
    phone: string;
    phoneHref: string;
    whatsapp: { number: string; message: string };
    address: string;
    schedule: string;
  };
  social: SocialLink[];
  countries: Country[];
  coverageCountries: CountryCode[];
  comingSoonLabel: string;
  topbarLinks: SiteLink[];
  navLinks: SiteLink[];
  navActions: SiteLink[];
  tracking: {
    label: string;
    placeholder: string;
    buttonLabel: string;
    errors: { empty: string; invalid: string; notFound: string };
    statusLabels: Record<GuideStatus, string>;
    modal: {
      title: string;
      origin: string;
      destination: string;
      eta: string;
      history: string;
      close: string;
    };
  };
  hero: { title: string; subtitle: string; cta: string; image: ImageRef };
  services: { national: ServiceBlock; international: ServiceBlock };
  smartDelivery: {
    badge: string;
    tagline: string;
    title: string;
    intro: string;
    benefits: { icon: BenefitIcon; title: string; text: string }[];
    stepsTitle: string;
    steps: string[];
    cta: string;
    image: ImageRef;
  };
  coverage: { title: string; subtitle: string; image: ImageRef };
  branchesSection: {
    title: string;
    searchLabel: string;
    searchPlaceholder: string;
    empty: string;
    clear: string;
    mapLoading: string;
  };
  jobs: {
    title: string;
    intro: string;
    positions: string[];
    zones: string[];
    labels: Record<JobLabelKey, string>;
    errors: Record<JobErrorKey, string>;
    success: { title: string; text: string; close: string };
  };
  footer: {
    companyTitle: string;
    companyLinks: SiteLink[];
    contactTitle: string;
    coverageTitle: string;
    legalLinks: SiteLink[];
    copyright: string;
  };
}
