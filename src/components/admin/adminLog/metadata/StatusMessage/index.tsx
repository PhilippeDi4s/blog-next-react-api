import type { LucideIcon } from "lucide-react";

export type StatusTone = "success" | "danger" | "warning" | "info" | "neutral";

type StatusMessageProps = {
  text: string;
  icon: LucideIcon;
  tone: StatusTone;
};

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "text-green-700",
  danger: "text-red-700",
  warning: "text-amber-700",
  info: "text-blue-700",
  neutral: "text-gray-700",
};

export function StatusMessage({ text, icon: Icon, tone }: StatusMessageProps) {
  return (
    <span className={`flex items-center gap-2 text-xl ${TONE_CLASSES[tone]}`}>
      <Icon size={24} aria-hidden="true" />
      {text}
    </span>
  );
}
