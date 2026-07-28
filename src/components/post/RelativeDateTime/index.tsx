"use client";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type RelativeDateTimeProps = {
  date: string;
};
export function RelativeDateTime({ date }: RelativeDateTimeProps) {
  const relative = formatDistanceToNow(new Date(date), {
    locale: ptBR,
    addSuffix: true,
  });

  return <span>{relative}</span>;
}
