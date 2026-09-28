"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { FormStatePostDto, PostResponseDto } from "@/lib/post/schemas";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const idErrors = validateId(id);
  if (idErrors) return { success: false, errors: idErrors };

  const res = await authenticatedApiRequest<FormStatePostDto>(
    `/post/me/${id}`,
    validation.token,
    {
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

  const post = res.data as unknown as PostResponseDto;

  revalidateTag("posts", "max");
  revalidateTag(`post-${post.id}`, "max");

  redirectWithNotice(`author`, Notice.POST_DELETED);
}
