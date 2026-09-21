import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { idSchema } from "../sharedSchemas/schemas";
import { FieldError } from "./action-result";

export function validateId(id: string): FieldError[] | null {
  const result = idSchema.safeParse(id);
  return result.success ? null : getZodErrorMessages(result.error);
}
