import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { PaginatedResponse } from "@/lib/shared/adminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { PostResponseDto, PostSearchParamsDto } from "../schemas";

export async function findManyPosts(
  token: string,
  params?: PostSearchParamsDto,
) {
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
  return authenticatedApiRequest<PaginatedResponse<PostResponseDto>>(
    `/admin/posts${query ? `?${query}` : ""}`,
    token,
    {},
  );
}

export async function findPostById(token: string, id: string) {
  const res = await findManyPosts(token, { id });

  if (!res.success) return res;

  const post = res.data.data[0];

  if (!post) {
    return {
      success: false as const,
      status: 404,
      errors: [{ code: "404", message: "Post não encontrado" }],
    };
  }

  return { success: true as const, data: post };
}

export async function getPosts(params?: PostSearchParamsDto) {
  const token = await getLoginSessionOrRedirect();
  return findManyPosts(token, params);
}

export async function getPostById(id: string) {
  const token = await getLoginSessionOrRedirect();
  return findPostById(token, id);
}
