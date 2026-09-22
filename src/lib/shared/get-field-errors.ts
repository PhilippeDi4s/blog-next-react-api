import { FieldError } from "./action-result";

export function getFieldErrors(
  fieldErrors: FieldError[],
): Record<string, string> {
  return fieldErrors.reduce<Record<string, string>>((acc, error) => {
    if (error.field) acc[error.field] = error.message;
    return acc;
  }, {});
}
