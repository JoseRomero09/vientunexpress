import type { Branch, Guide, SiteConfig } from '@/types';
import branchesJson from '@/data/branches.json';
import guidesJson from '@/data/guides.json';
import siteJson from '@/data/site.json';

// Único punto de entrada a los JSON: los componentes nunca los importan directamente.
export const site = siteJson as SiteConfig;
export const guides = guidesJson as Guide[];
export const branches = branchesJson as Branch[];
