import { getAuthorPostById } from "@/lib/post/queries/author";
import { notFound } from "next/navigation";
import { ManagePostForm } from "../ManagePostForm";
import { PublicPostSchema } from "@/lib/post/schemas";

export async function PostFormWrapper({ id }: { id: string }) {
  const post = await getAuthorPostById(id);

  if (!post) notFound();

  // const publicPost = makePublicPostFromDb(post);

  const publicPost = PublicPostSchema.parse(post)


  return (
    <ManagePostForm mode="update" publicPost={publicPost} />
  );
}