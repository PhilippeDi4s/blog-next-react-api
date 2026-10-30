import { ManagePostForm } from "@/components/post/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { getAuthorPostById } from "@/lib/post/queries/author";
import { Metadata } from "next";
import { Suspense } from "react";
import { PostFormStateSchema } from "@/lib/post/schemas";
import { Heading } from "@/components/ui/Heading";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

export const metadata: Metadata = {
  title: "Editar post",
};

type AuthorPostsIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AuthorPostsIdPage({ params }: AuthorPostsIdPageProps) {
  return (
    <section className="flex flex-col gap-6">
      <Heading as="h2" className="text-xl font-extrabold">
        Editar Post
      </Heading>
      <Suspense fallback={<SpinLoader />}>
        <PostEditPageContent params={params} />
      </Suspense>
    </section>
  );
}

export async function PostEditPageContent({ params }: AuthorPostsIdPageProps) {
  const { id } = await params;

  const postRes = await getAuthorPostById(id);

  if (!postRes.success) {
    return (
      <ErrorMessage
        contentTitle="Não foi possível carregar o post"
        content={postRes.errors[0]?.message ?? "Tente novamente em alguns instantes."}
      />
    );
  }

  const post = postRes.data;
  const publicPost = PostFormStateSchema.parse({
    ...post,
    coverImage: post.coverImage?.url ?? "",
  });

  return <ManagePostForm mode="update" publicPost={publicPost} postId={id} />;
}
