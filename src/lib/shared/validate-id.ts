import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { idSchema } from "../sharedSchemas/confirmAdminAction";
import { FieldError } from "./types/error";

export function validateId(id: string): FieldError[] | null {
  const result = idSchema.safeParse(id);
  return result.success ? null : getZodErrorMessages(result.error);
}
