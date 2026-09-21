import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { z } from "zod";
import { FieldError } from "../shared/action-result";

type ParseFormDataResult<TSchema extends z.ZodType, TFormState> =
  | { success: true; data: z.output<TSchema>; formState: TFormState }
  | { success: false; errors: FieldError[]; formState: TFormState };

export function parseFormData<
  TSchema extends z.ZodType,
  TFormStateSchema extends z.ZodType,
>(
  formData: FormData,
  schema: TSchema,
  formStateSchema: TFormStateSchema,
): ParseFormDataResult<TSchema, z.output<TFormStateSchema>> {
  const formDataToObj = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(formDataToObj);

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
      formState: formStateSchema.parse(formDataToObj),
    };
  }

  return {
    success: true,
    data: parsed.data,
    formState: formStateSchema.parse(formDataToObj),
  };
}
