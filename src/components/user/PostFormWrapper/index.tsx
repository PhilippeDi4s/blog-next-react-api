import { makePublicPostFromDb } from "@/dto/post/dto";
import { findPostByIdAdmin } from "@/lib/post/queries/admin";
import { notFound } from "next/navigation";
import { ManagePostForm } from "../ManagePostForm";

export async function PostFormWrapper({ id }: { id: string }) {
  const post = await findPostByIdAdmin(id);

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);

  return (
    <ManagePostForm mode="update" publicPost={publicPost} />
  );
}