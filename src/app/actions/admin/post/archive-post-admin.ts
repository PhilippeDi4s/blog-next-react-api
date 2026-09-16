"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/action-result";
import { validateId } from "@/lib/shared/validate-id";
import { ConfirmActionAdmin } from "@/lib/sharedSchemas/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";

export async function archivePostAdminAction(
  postId: string,
  formData: FormData,
): Promise<ActionResult> {
  const idErrors = validateId(postId);
  if (idErrors) return { success: false, errors: idErrors };

  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = ConfirmActionAdmin.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const res = await authenticatedApiRequest(
    `admin/posts/${postId}`,
    validation.token,
    {
      method: "DELETE",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  revalidateTag("posts", "max");
  revalidateTag(`post-${postId}`, "max");
  redirectWithNotice(`admin/posts`, Notice.ADMIN_POST_ARCHIVE);
}
