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
