import { FieldError } from "@/lib/shared/action-result";
import z from "zod";

export function getZodErrorMessages<T>(error: z.ZodError<T>): FieldError[] {
  const errors = z.flattenError(error);

  const formErrors: FieldError[] = errors.formErrors.map((message) => ({
    code: "VALIDATION_ERROR",
    message,
  }));

  const fieldErrors: FieldError[] = Object.entries(
    errors.fieldErrors as Record<string, string[] | undefined>,
  ).flatMap(([field, messages]) => {
    const validMessages = Array.isArray(messages) ? messages : [];

    return validMessages.map((message) => ({
      code: `INVALID_${field.toUpperCase()}`,
      field,
      message,
    }));
  });

  return [...formErrors, ...fieldErrors];
}
