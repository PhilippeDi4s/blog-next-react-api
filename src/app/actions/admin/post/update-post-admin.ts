"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import {
    AdminUpdatePostSchema,
  FormStatePostDto,
  FormStatePostSchema,
} from "@/lib/post/schemas";
import { ActionResult } from "@/lib/shared/action-result";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function updatePostAdminAction(
  postId: string,
  formData: FormData,
): Promise<ActionResult<FormStatePostDto>> {
  const idErrors = validateId(postId);
  if (idErrors) return { success: false, errors: idErrors };

  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = parseFormData(formData, AdminUpdatePostSchema, FormStatePostSchema);

  if (!parsed.success) {
    return {
      success: parsed.success,
      errors: parsed.errors,
      formState: parsed.formState,
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
      formState: FormStatePostSchema.parse(parsed.data),
    };
  }

  revalidateTag("posts", "max");
  revalidateTag(`post-${postId}`, "max");
  redirectWithNotice(`admin/posts/${postId}`, Notice.ADMIN_POST_UPDATE);
}
