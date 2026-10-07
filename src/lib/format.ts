const TIME_ZONE = 'America/El_Salvador';

const dateFormatter = new Intl.DateTimeFormat('es-SV', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('es-SV', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

// "2026-10-02" se interpreta a mediodía local para que la zona horaria no cambie el día.
export const formatDate = (isoDate: string) => dateFormatter.format(new Date(`${isoDate}T12:00:00-06:00`));

export const formatDateTime = (isoDateTime: string) => dateTimeFormatter.format(new Date(isoDateTime));
