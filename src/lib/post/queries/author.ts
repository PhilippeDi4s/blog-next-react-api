import { getLoginSession } from "@/lib/login/manage-login";
import { PostModel } from "@/models/post/post-models";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";

export const findAllPostsAuthor = async (jwtToken: string | null) => {
  "use cache";
  cacheTag("posts");

  return authenticatedApiRequest<PostModel[]>(`/post/me`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

export const findPostByIdAuthor = async (
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

export async function getAuthorPosts() {
  const jwtToken = await getLoginSession();
  return findAllPostsAuthor(jwtToken || null);
}

export async function getAuthorPostById(id: string) {
  const jwtToken = await getLoginSession();
  return findPostByIdAuthor(id, jwtToken || null);
}
