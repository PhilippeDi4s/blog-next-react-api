import { apiRequest } from "@/utils/api-request";
import { cacheTag } from "next/cache";
import { PostResponseDto } from "../schemas";

export const findAllPublicPostsCached = async () => {
  "use cache";

  cacheTag("posts");

  const postResponse = await apiRequest<PostResponseDto[]>("/post", {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return postResponse;
};

export const findPublicPostBySlugCached = async (slug: string) => {
  "use cache";

  cacheTag("posts");
  cacheTag(`post-${slug}`);

  const postResponse = await apiRequest<PostResponseDto>(`/post/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return postResponse;
};
