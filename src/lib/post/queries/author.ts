import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";
import { PostResponseDto } from "../schemas";

export const findAllPostsAuthor = async (jwtToken: string | null) => {
  "use cache";
  cacheTag("posts");

  return authenticatedApiRequest<PostResponseDto[]>(`/post/me`, jwtToken, {
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

  return authenticatedApiRequest<PostResponseDto>(`/post/me/${id}`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

export async function getAuthorPosts() {
  const jwtToken = await getLoginSessionOrRedirect();
  return findAllPostsAuthor(jwtToken || null);
}

export async function getAuthorPostById(id: string) {
  const jwtToken = await getLoginSessionOrRedirect();
  return findPostByIdAuthor(id, jwtToken || null);
} 
