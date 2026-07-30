import { PostModel } from "@/models/post/post-models";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";

export const findAllPostsAdmin = async () => {
  "use cache";
  cacheTag(`posts`);

  const postsResponse = await authenticatedApiRequest<PostModel[]>(
    `/post/me/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  return postsResponse;
};

export const findPostByIdAdmin = async (id: string) => {
  "use cache";

  cacheTag("posts");
  cacheTag(`post-${id}`);

  const postResponse = await authenticatedApiRequest<PostModel>(
    `/post/me/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  return await postResponse;
};
