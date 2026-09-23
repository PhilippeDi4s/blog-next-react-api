"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import {
  AdminUpdatePostDto,
  AdminUpdatePostSchema,
  PostResponseDto,
  PostResponseSchema,
} from "@/lib/post/schemas";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";

export async function updatePostAdminAction(
  postId: string,
  formData: AdminUpdatePostDto,
): Promise<ActionResult<PostResponseDto>> {
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

  const parsedResponse = PostResponseSchema.safeParse(res.data);

  if (!parsedResponse.success) {
    return {
      success: false,
      errors: [
        {
          code: "INVALID_RESPONSE",
          message: "Resposta inesperada do servidor",
        },
      ],
    };
  }
  revalidateTag("posts", "max");
  revalidateTag(`post-${postId}`, "max");
  return { success: true, errors: [], data: parsedResponse.data };
}
