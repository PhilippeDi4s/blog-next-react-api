export type FieldError = {
  code: string;
  field?: string;
  message: string;
};

export type ActionResult<TFormState = unknown> = {
  success: boolean;
  errors: FieldError[];
  formState?: TFormState;
};
