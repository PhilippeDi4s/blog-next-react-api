"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import {
  PostFormStateDto,
  PostFormStateSchema,
  PostResponseDto,
  UpdatePostSchema,
} from "@/lib/post/schemas";
import { FormActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function updatePostAction(
  postId: string,
  prevState: FormActionResult<PostFormStateDto>,
  formData: FormData,
): Promise<FormActionResult<PostFormStateDto>> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      formState: PostFormStateSchema.parse(formData),
    };
  }

  const idErrors = validateId(postId);
  if (idErrors) {
    redirectWithNotice("author/post", Notice.POST_NOT_FOUND);
  }

  const parsed = parseFormData(formData, UpdatePostSchema, PostFormStateSchema);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.errors,
      formState: parsed.formState,
    };
  }

  const res = await authenticatedApiRequest<PostResponseDto>(
    `/post/me/${postId}`,
    validation.token,
    {
      method: "PATCH",
      body: JSON.stringify(parsed.data),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
      formState: parsed.formState,
    };
  }

  const post = res.data;

  revalidateTag("posts", "max");
  revalidateTag(`post-${post.id}`, "max");

  redirectWithNotice(`author/post/${post.id}`, Notice.POST_UPDATED);
}
