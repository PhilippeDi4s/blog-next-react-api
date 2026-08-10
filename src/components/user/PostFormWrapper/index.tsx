import { getAdminPostById } from "@/lib/post/queries/admin";
import { notFound } from "next/navigation";
import { ManagePostForm } from "../ManagePostForm";
import { PublicPostSchema } from "@/lib/post/schemas";

export async function PostFormWrapper({ id }: { id: string }) {
  const post = await getAdminPostById(id);

  if (!post) notFound();

  // const publicPost = makePublicPostFromDb(post);

  const publicPost = PublicPostSchema.parse(post)


  return (
    <ManagePostForm mode="update" publicPost={publicPost} />
  );
}