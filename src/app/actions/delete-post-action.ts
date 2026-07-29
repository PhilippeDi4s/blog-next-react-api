"use server";

import { postRepository } from "@/repositories/post";
import { revalidateTag } from "next/cache";

export async function deletePostAction(form: FormData) {

  const id = form.get("post_id");

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  try {
    await postRepository.deletePostById(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: "Erro desconhecido",
    };
  }

  revalidateTag("posts", "max");
  revalidateTag(`post-${id}`, "max");

  return {
    success: true,
  };
}
