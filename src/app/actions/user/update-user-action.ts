import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { FormActionResult } from "@/lib/shared/adminAction";
import {
  UpdateUserSchema,
  UserFormStateDto,
  UserFormStateSchema,
} from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export async function UpdateUserAction(
  prevState: FormActionResult<UserFormStateDto>,
  formData: FormData,
): Promise<FormActionResult<UserFormStateDto>> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      formState: UserFormStateSchema.parse(formData),
    };
  }

  const parsed = parseFormData(formData, UpdateUserSchema, UserFormStateSchema);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.errors,
      formState: parsed.formState,
    };
  }

  const res = await authenticatedApiRequest("user/me", validation.token, {
    method: "PATCH",
    body: JSON.stringify(parsed.data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
      formState: parsed.data,
    };
  }

  redirectWithNotice("login", Notice.USER_UPDATED);
}
