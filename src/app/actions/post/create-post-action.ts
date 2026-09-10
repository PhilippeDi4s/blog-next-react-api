"use server";

import { getLoginSession } from "@/lib/auth/session";
import {
  CreatePostSchema,
  FormStatePostDto,
  FormStatePostSchema,
} from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type CreatePostActionState = {
  formState: FormStatePostDto;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const jwt = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = CreatePostSchema.safeParse(formDataToObj);

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

  const createPostResponse = await authenticatedApiRequest<FormStatePostDto>(
    `/post/me`,
    jwt,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!createPostResponse.success) {
    return {
      formState: FormStatePostSchema.parse(formDataToObj),
      errors: createPostResponse.errors,
    };
  }

  const createdPost = createPostResponse.data;

  revalidateTag("posts", "max");
  redirect(`/author/post/${createdPost.id}?created=1`);
}
