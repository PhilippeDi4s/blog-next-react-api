"use server";
import { parseFormData } from "@/lib/forms/parse-form-data";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { FormActionResult } from "@/lib/shared/adminAction";
import {
  CreateUserSchema,
  UserFormStateDto,
  UserFormStateSchema,
} from "@/lib/user/schemas";
import { apiRequest } from "@/utils/api-request";
import { simulateDelay } from "@/utils/async-delay";

export async function createUserAction(
  prevState: FormActionResult<UserFormStateDto>,
  formData: FormData,
): Promise<FormActionResult<UserFormStateDto>> {
  await simulateDelay(3000);

  const parsed = parseFormData(
    formData,
    CreateUserSchema,
    UserFormStateSchema,
  );

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.errors,
      formState: parsed.formState,
    };
  }

  const res = await apiRequest<UserFormStateDto>("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  if (!res.success) {
    return {
      success: false,
      formState: parsed.data,
      errors: res.errors,
    };
  }

  redirectWithNotice("login", Notice.USER_CREATED);
}
