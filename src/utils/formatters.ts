export function formatCurrency(amount: number, currency = '$'): string {
  const formatted = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(amount || 0);
  return `${currency} ${formatted}`;
}

export function formatDateSpanish(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatDateSpanishLong(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function cleanPhoneForWhatsApp(phone: string): string {
  if (!phone) return '';
  // Remove non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  // If Argentine number starting with 0, replace with 54
  if (cleaned.startsWith('0')) {
    cleaned = '54' + cleaned.substring(1);
  }
  // If no country code (e.g. 11 1234 5678 -> 10 digits), assume Argentina (549)
  if (cleaned.length === 10) {
    cleaned = '549' + cleaned;
  }
  return cleaned;
}

export function getStatusBadge(status: string) {
  switch (status) {
    case 'confirmado':
      return {
        label: 'Confirmado',
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'pendiente':
      return {
        label: 'Pendiente',
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'completado':
      return {
        label: 'Completado',
        bg: 'bg-sky-50 text-sky-700 border-sky-200',
        dot: 'bg-sky-500',
      };
    case 'cancelado':
      return {
        label: 'Cancelado',
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
      };
    case 'en_espera':
      return {
        label: 'En espera',
        bg: 'bg-purple-50 text-purple-700 border-purple-200',
        dot: 'bg-purple-500',
      };
    default:
      return {
        label: status,
        bg: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
      };
  }
}
