// Quita tildes y mayúsculas para comparar búsquedas ("Sán Miguél" → "san miguel").
export const normalizeText = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
