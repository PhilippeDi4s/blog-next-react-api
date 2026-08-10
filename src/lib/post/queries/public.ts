import { apiRequest } from "@/utils/api-request";
import { cacheTag } from "next/cache";
import { PostModel } from "@/models/post/post-models";

export const findAllPublicPostsCached = async () => {
  "use cache";

  cacheTag("posts");

  const postResponse = await apiRequest<PostModel[]>("/post", {
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

  const postResponse = await apiRequest<PostModel>(`/post/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return postResponse;
};
