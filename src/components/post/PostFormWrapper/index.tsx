import { getAuthorPostById } from "@/lib/post/queries/author";
import { ManagePostForm } from "../ManagePostForm";
import { PostFormStateSchema } from "@/lib/post/schemas";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

export async function PostFormWrapper({ id }: { id: string }) {
  const post = await getAuthorPostById(id);

  if (!post.success) {
    return (
      <ErrorMessage
        contentTitle="Não foi possível carregar o post"
        content={post.errors[0]?.message ?? "Tente novamente em alguns instantes."}
      />
    );
  }

  const publicPost = PostFormStateSchema.parse(post.data);

  return <ManagePostForm mode="update" publicPost={publicPost} postId={id} />;
}
