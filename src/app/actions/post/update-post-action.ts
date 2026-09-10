"use server";

import { getLoginSession } from "@/lib/auth/session";
import {
  FormStatePostDto,
  FormStatePostSchema,
  UpdatePostSchema,
} from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { makeRandomString } from "@/utils/make-random-string";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type UpdatePostActionState = {
  formState: FormStatePostDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const jwt = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id")?.toString() || "";

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePostSchema.safeParse(formDataToObj);

  if (!jwt) {
    return {
      formState: FormStatePostSchema.parse(formDataToObj),
      errors: ["Faça login em outra aba antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
      formState: FormStatePostSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObj.data;

  const updatePostResponse = await authenticatedApiRequest<FormStatePostDto>(
    `/post/me/${id}`,
    jwt,
    {
      method: "PATCH",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!updatePostResponse.success) {
    return {
      formState: FormStatePostSchema.parse(formDataToObj),
      errors: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;

  revalidateTag("posts", "max");
  revalidateTag(`post-${post.id}`, "max");
  
  redirect(`/author/post/${post.id}?updated=1`)
}
