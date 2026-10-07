export const buildWhatsAppUrl = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
