"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import {
  AdminUpdatePostDto,
  AdminUpdatePostSchema,
  FormStatePostSchema,
} from "@/lib/post/schemas";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";

export async function updatePostAdminAction(
  postId: string,
  formData: AdminUpdatePostDto,
): Promise<ActionResult> {
  const idErrors = validateId(postId);
  if (idErrors) return { success: false, errors: idErrors };

  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = AdminUpdatePostSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const res = await authenticatedApiRequest(
    `admin/posts/${postId}/update`,
    validation.token,
    {
      method: "PATCH",
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
  return { success: true, errors: [] };
}
