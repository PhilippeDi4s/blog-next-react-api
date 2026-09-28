"use server";

import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/adminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export async function logoutAction(): Promise<ActionResult> {
  const token = await getLoginSessionOrRedirect();

  const res = await authenticatedApiRequest("auth/logout", token, {
    method: "POST",
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  redirectWithNotice("login", Notice.USER_LOGOUT);
}
