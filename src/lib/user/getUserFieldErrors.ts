import { FieldError } from "../shared/action-result";

type UserFieldErrors = Record<string, string>;

export function getUserFieldErrors(
  fieldErrors: FieldError[],
): UserFieldErrors {
  return fieldErrors.reduce<UserFieldErrors>((acc, error) => {
    if (error.field) {
      acc[error.field] = error.message;
    }
    return acc;
  }, {});
}