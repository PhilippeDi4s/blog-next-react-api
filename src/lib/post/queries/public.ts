import { apiRequest } from "@/utils/api-request";
import { cacheTag } from "next/cache";
import { PostResponseDto } from "../schemas";
import { toQueryResult } from "@/utils/to-query-result";
import { QueryResult } from "@/lib/shared/types/query";

export const findAllPublicPostsCached = async (): Promise<QueryResult<PostResponseDto[]>> => {
  "use cache";

  cacheTag("posts");

  const postResponse = await apiRequest<PostResponseDto[]>("/post", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return toQueryResult(postResponse);
};

export const findPublicPostBySlugCached = async (slug: string): Promise<QueryResult<PostResponseDto>> => {
  "use cache";

  cacheTag("posts");
  cacheTag(`post-${slug}`);

  const postResponse = await apiRequest<PostResponseDto>(`/post/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return toQueryResult(postResponse);
};
