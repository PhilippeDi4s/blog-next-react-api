"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ActionResult } from "@/lib/shared/types/action";
import { validateId } from "@/lib/shared/validate-id";
import {
  ConfirmActionAdminDto,
  ConfirmActionAdminSchema,
} from "@/lib/sharedSchemas/confirmAdminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";

export async function setPostArchiveStatusAdminAction(
  postId: string,
  isArchived: boolean,
  formData: ConfirmActionAdminDto,
): Promise<ActionResult> {
  const idErrors = validateId(postId);
  if (idErrors) return { success: false, errors: idErrors };

  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = ConfirmActionAdminSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const endpoint = isArchived
    ? `/admin/posts/${postId}`
    : `/admin/posts/${postId}/restoure`;
  const res = await authenticatedApiRequest(endpoint, validation.token, {
    method: isArchived ? "DELETE" : "PATCH",
    body: JSON.stringify(parsed.data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.success) return { success: false, errors: res.errors };

  revalidateTag("posts", "max");
  revalidateTag(`post-${postId}`, "max");
  return { success: true, errors: [] };
}
