import { FieldError } from "./error";

export type ActionResult<TData = undefined> = {
  success: boolean;
  errors: FieldError[];
  data?: TData;
};

export type PendingAction = {
  key: string;
  label: string;
  run: (reason: string) => Promise<ActionResult<unknown>>;
  needsPassword: boolean;
};

export type FormActionResult<TFormState> = {
  success: boolean;
  errors: FieldError[];
  formState: TFormState;
};
