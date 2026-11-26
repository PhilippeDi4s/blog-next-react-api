"use server";

import {
  clearLoginSession,
  getLoginSessionOrRedirect,
} from "@/lib/auth/session";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/types/action";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { USER_SESSION_CACHE_TAG } from "@/lib/user/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";

export async function logoutAction(): Promise<ActionResult> {
  const token = await getLoginSessionOrRedirect();

  const res = await authenticatedApiRequest("/auth/logout", token, {
    method: "POST",
  });

  if (!res.success) {
    console.log(res.errors);
    return {
      success: false,
      errors: res.errors,
    };
  }

  await clearLoginSession();
  revalidateTag(USER_SESSION_CACHE_TAG, "max");
  revalidatePath("/", "layout");
  redirectWithNotice("/", Notice.USER_LOGOUT);
}
