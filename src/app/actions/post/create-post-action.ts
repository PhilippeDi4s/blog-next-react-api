"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import {
  CreatePostSchema,
  PostFormStateDto,
  PostFormStateSchema,
  PostResponseDto,
} from "@/lib/post/schemas";
import { FormActionResult } from "@/lib/shared/adminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function createPostAction(
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

  const parsed = parseFormData(formData, CreatePostSchema, PostFormStateSchema);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.errors,
      formState: parsed.formState,
    };
  }

  const res = await authenticatedApiRequest<PostResponseDto>(
    `/post/me`,
    validation.token,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
      formState: parsed.formState,
    };
  }

  const createdPost = res.data;

  revalidateTag("posts", "max");
  redirectWithNotice(`author/post/${createdPost.id}`, Notice.POST_CREATED);
}
