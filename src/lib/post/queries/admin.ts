import { postRepository } from "@/repositories/post";
import { cacheTag } from "next/cache";

export const findAllPostsAdmin = async () => {
  "use cache";
  cacheTag(`posts`);

  return await postRepository.findAll();
};

export const findPostByIdAdmin = async (id: string) => {
  "use cache";
  
  cacheTag("posts");
  cacheTag(`post-${id}`);

  return await postRepository.findById(id);
};

