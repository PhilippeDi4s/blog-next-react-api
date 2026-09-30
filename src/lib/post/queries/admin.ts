import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { AdminPostSearchDto, PostResponseDto } from "../schemas";

export async function findManyPosts(
  token: string,
  params?: AdminPostSearchDto,
) {
  const searchParams = new URLSearchParams();

  if (params?.id) {
    searchParams.set("id", params.id);
  } else {
    if (params?.title) {
      searchParams.set("title", params.title);
    }

    if (params?.slug) {
      searchParams.set("slug", params.slug);
    }

    if (params?.authorId) {
      searchParams.set("authorId", params.authorId);
    }

    if (params?.authorName) {
      searchParams.set("authorName", params.authorName);
    }

    if (params?.authorName) {
      searchParams.set("authorName", params.authorName);
    }

    if (params?.authorEmail) {
      searchParams.set("authorEmail", params.authorEmail);
    }

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

  const res = await authenticatedApiRequest<PostResponseDto[]>(
    `admin/posts${query ? `?${query}` : ""}`,
    token,
    {},
  );

  return res;
}
