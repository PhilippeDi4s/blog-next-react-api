import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/adminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export async function DeleteUserAction(): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const res = await authenticatedApiRequest("user/me", validation.token, {
    method: "DELETE",
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  redirectWithNotice("login", Notice.USER_DELETED);
}
