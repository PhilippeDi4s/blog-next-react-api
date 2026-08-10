import { getLoginSession } from "@/lib/login/manage-login";
import { PostModel } from "@/models/post/post-models";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";

export const findAllPostsAdmin = async (jwtToken: string | null) => {
  "use cache";
  cacheTag("posts");

  return authenticatedApiRequest<PostModel[]>(`/post/me`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

export const findPostByIdAdmin = async (
  id: string,
  jwtToken: string | null,
) => {
  "use cache";
  cacheTag("posts");
  cacheTag(`post-${id}`);

  return authenticatedApiRequest<PostModel>(`/post/me/${id}`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

export async function getAdminPosts() {
  const jwtToken = await getLoginSession();
  return findAllPostsAdmin(jwtToken || null);
}

export async function getAdminPostById(id: string) {
  const jwtToken = await getLoginSession();
  return findPostByIdAdmin(id, jwtToken || null);
}
