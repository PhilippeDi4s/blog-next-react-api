import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { PaginatedResponse } from "@/lib/shared/types/pagination";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { PostResponseDto, PostSearchParamsDto } from "../schemas";
import { QueryResult } from "@/lib/shared/types/query";
import { toQueryResult } from "@/utils/to-query-result";

export async function findManyPosts(
  token: string,
  params?: PostSearchParamsDto,
): Promise<QueryResult<PaginatedResponse<PostResponseDto>>> {
  const searchParams = new URLSearchParams();

  if (params?.id) {
    searchParams.set("id", params.id);
  } else {
    if (params?.title) searchParams.set("title", params.title);
    if (params?.slug) searchParams.set("slug", params.slug);
    if (params?.authorId) searchParams.set("authorId", params.authorId);
    if (params?.authorName) searchParams.set("authorName", params.authorName);
    if (params?.authorEmail)
      searchParams.set("authorEmail", params.authorEmail);
    if (params?.published !== undefined) {
      searchParams.set("published", String(params.published));
    }
    if (params?.startDate) {
      searchParams.set("startDate", params.startDate.toISOString());
    }
    if (params?.endDate) {
      searchParams.set("endDate", params.endDate.toISOString());
    }
    if (params?.page !== undefined) {
      searchParams.set("page", String(params.page));
    }
    if (params?.limit !== undefined) {
      searchParams.set("limit", String(params.limit));
    }
  }

  const query = searchParams.toString();
  const result = await authenticatedApiRequest<PaginatedResponse<PostResponseDto>>(
    `/admin/posts${query ? `?${query}` : ""}`,
    token,
    {},
  );
  return toQueryResult(result);
}

export async function findPostById(token: string, id: string): Promise<QueryResult<PostResponseDto>> {
  const res = await findManyPosts(token, { id });

  if (!res.success) return res;

  const post = res.data.data[0];

  if (!post) {
    return {
      success: false as const,
      errors: [{ code: "404", message: "Post não encontrado" }],
    };
  }

  return { success: true as const, data: post, errors: [] };
}

export async function getPosts(params?: PostSearchParamsDto): Promise<QueryResult<PaginatedResponse<PostResponseDto>>> {
  const token = await getLoginSessionOrRedirect();
  return findManyPosts(token, params);
}

export async function getPostById(id: string): Promise<QueryResult<PostResponseDto>> {
  const token = await getLoginSessionOrRedirect();
  return findPostById(token, id);
}
