import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate);
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatDate(rawDate: string): string {
  const date = parseISO(rawDate);

  if (!isValid(date)) return "";

  return format(date, "dd/MM/yyyy", {
    locale: ptBR,
  });
}

export function formatHour(hourMs: number): string {
  const date = new Date(hourMs);
  return format(date, "HH:mm:ss", {
    locale: ptBR,
  });
}
