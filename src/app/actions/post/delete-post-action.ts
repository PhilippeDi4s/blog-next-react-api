"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { PostResponseDto } from "@/lib/post/schemas";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function deletePostAction(postId: string): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const idErrors = validateId(postId);
  if (idErrors) {
    redirectWithNotice("author/post", Notice.POST_NOT_FOUND);
  }

  const res = await authenticatedApiRequest<PostResponseDto>(
    `/post/me/${postId}`,
    validation.token,
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  const post = res.data;

  revalidateTag("posts", "max");
  revalidateTag(`post-${post.id}`, "max");

  redirectWithNotice(`author/post`, Notice.POST_DELETED);
}
