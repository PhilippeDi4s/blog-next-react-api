import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/adminAction";
import { UpdatePasswordSchema } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";

export async function UpdateUserPasswordAction(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const formObj = Object.fromEntries(formData);
  const parsed = UpdatePasswordSchema.safeParse(formObj);

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const res = await authenticatedApiRequest(
    "user/me/password",
    validation.token,
    {
      method: "PATCH",
      body: JSON.stringify(parsed.data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  redirectWithNotice("login", Notice.USER_UPDATED_PASSWORD);
}
