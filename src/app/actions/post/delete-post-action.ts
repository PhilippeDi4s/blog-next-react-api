"use server";

import { getLoginSession } from "@/lib/login/manage-login";
import { PublicPostDto } from "@/lib/post/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    return {
      error: "Faça login novamente em outra aba",
    };
  }

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  const postResponse = await authenticatedApiRequest<PublicPostDto>(
    `/post/me/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!postResponse.success) {
    return {
      error: "Erro ao encontrar post",
    };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostDto>(
    `/post/me/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!deletePostResponse.success) {
    return {
      error: "Erro ao apagar post",
    };
  }

  revalidateTag("posts", "max");
  revalidateTag(`post-${postResponse.data.slug}`, "max");

  return {
    error: "",
  };
}
