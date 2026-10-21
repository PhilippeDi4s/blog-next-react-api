import { CheckIcon, Clock3Icon, UsersIcon, XIcon } from "lucide-react";

export enum SessionStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  LOGGED_OUT = "LOGGED_OUT",
}

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  [SessionStatus.ACTIVE]: "Ativa",
  [SessionStatus.EXPIRED]: "Expirada",
  [SessionStatus.LOGGED_OUT]: "Encerrada",
};

export const sessionStatusOptions = [
  { value: "", label: "Todos", icon: UsersIcon },
  ...Object.values(SessionStatus).map((status) => ({
    value: status,
    label: SESSION_STATUS_LABELS[status],
    icon:
      status === SessionStatus.ACTIVE
        ? CheckIcon
        : status === SessionStatus.EXPIRED
          ? Clock3Icon
          : XIcon,
  })),
];
