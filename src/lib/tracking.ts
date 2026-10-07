import type { Guide } from '@/types';

export const GUIDE_PATTERN = /^[A-Z]{6}-\d{2}-\d{10}$/;

export const normalizeGuideId = (raw: string) => raw.trim().toUpperCase();

export const isValidGuideId = (id: string) => GUIDE_PATTERN.test(id);

export const findGuide = (id: string, guides: Guide[]) => guides.find((guide) => guide.id === id);

export type TrackingResult =
  | { kind: 'empty' }
  | { kind: 'invalid' }
  | { kind: 'notFound' }
  | { kind: 'found'; guide: Guide };

export function trackGuide(raw: string, guides: Guide[]): TrackingResult {
  const id = normalizeGuideId(raw);
  if (!id) return { kind: 'empty' };
  if (!isValidGuideId(id)) return { kind: 'invalid' };
  const guide = findGuide(id, guides);
  return guide ? { kind: 'found', guide } : { kind: 'notFound' };
}
