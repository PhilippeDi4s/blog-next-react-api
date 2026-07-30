"use server";

import { getLoginSession } from "@/lib/login/manage-login";
import {
  PublicPostDto,
  PublicPostSchema,
  UpdatePostSchema,
} from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { makeRandomString } from "@/utils/make-random-string";
import { revalidateTag } from "next/cache";

type UpdatePostActionState = {
  formState: PublicPostDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await getLoginSession();

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

  if (!isAuthenticated) {
    return {
      formState: PublicPostSchema.parse(formDataToObj),
      errors: ["Faça login em outra aba antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
      formState: PublicPostSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObj.data;

  const updatePostResponse = await authenticatedApiRequest<PublicPostDto>(
    `/post/me/${id}`,
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
      formState: PublicPostSchema.parse(formDataToObj),
      errors: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;

  revalidateTag("posts", "post");
  revalidateTag(`post-${post.slug}`, "post");

  return {
    formState: PublicPostSchema.parse(post),
    errors: [],
    success: makeRandomString(),
  };
}

function getLoginSessionForApi() {
  throw new Error("Function not implemented.");
}
