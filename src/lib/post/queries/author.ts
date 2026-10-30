import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";
import { PostResponseDto } from "../schemas";
import { QueryResult } from "@/lib/shared/types/query";
import { toQueryResult } from "@/utils/to-query-result";

export const findAllPostsAuthor = async (jwtToken: string | null): Promise<QueryResult<PostResponseDto[]>> => {
  "use cache";
  cacheTag("posts");

  const result = await authenticatedApiRequest<PostResponseDto[]>(`/post/me`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
  return toQueryResult(result);
};

export const findPostByIdAuthor = async (
  id: string,
  jwtToken: string | null,
): Promise<QueryResult<PostResponseDto>> => {
  "use cache";
  cacheTag("posts");
  cacheTag(`post-${id}`);

  const result = await authenticatedApiRequest<PostResponseDto>(`/post/me/${id}`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
  return toQueryResult(result);
};

export async function getAuthorPosts(): Promise<QueryResult<PostResponseDto[]>> {
  const jwtToken = await getLoginSessionOrRedirect();
  return findAllPostsAuthor(jwtToken || null);
}

export async function getAuthorPostById(id: string): Promise<QueryResult<PostResponseDto>> {
  const jwtToken = await getLoginSessionOrRedirect();
  return findPostByIdAuthor(id, jwtToken || null);
} 
