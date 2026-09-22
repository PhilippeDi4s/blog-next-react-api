export type FieldError = {
  code: string;
  field?: string;
  message: string;
};

export type ActionResult = {
  success: boolean;
  errors: FieldError[];
};

export type PendingAction = {
  key: string;
  label: string;
  run: (reason: string) => Promise<ActionResult>;
  needsPassword: boolean;
};
