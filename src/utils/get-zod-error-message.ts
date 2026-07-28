import z from 'zod';

export function getZodErrorMessages<T>(error: z.ZodError<T>): string[] {
  const errors = z.flattenError(error);
  const formErrors = errors.formErrors;
  const fieldErrors = Object.values(errors.fieldErrors).flat() as string[];
  return [...formErrors, ...fieldErrors];
}