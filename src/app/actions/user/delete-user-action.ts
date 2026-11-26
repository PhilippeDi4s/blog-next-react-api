"use server";

import { clearLoginSession } from "@/lib/auth/session";
import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/types/action";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { USER_SESSION_CACHE_TAG } from "@/lib/user/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";

export async function DeleteUserAction(): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const res = await authenticatedApiRequest("/user/me", validation.token, {
    method: "DELETE",
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  await clearLoginSession();
  revalidateTag(USER_SESSION_CACHE_TAG, "max");
  revalidatePath("/", "layout");
  redirectWithNotice("login", Notice.USER_DELETED);
}
