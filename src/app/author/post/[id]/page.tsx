import { ManagePostForm } from "@/components/post/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { getAuthorPostById } from "@/lib/post/queries/author";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FormStatePostSchema } from "@/lib/post/schemas";

export const metadata: Metadata = {
  title: "Editar post",
};

type AuthorPostsIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AuthorPostsIdPage({ params }: AuthorPostsIdPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar Post</h1>
      <Suspense fallback={<SpinLoader />}>
        <PostEditPageContent params={params} />
      </Suspense>
    </div>
  );
}

export async function PostEditPageContent({ params }: AuthorPostsIdPageProps) {
  const { id } = await params;

  const postRes = await getAuthorPostById(id);

  if (!postRes.success) {
    console.log(postRes.errors);
    notFound();
  }

  const post = postRes.data;
  const publicPost = FormStatePostSchema.parse(post);

  return <ManagePostForm mode="update" publicPost={publicPost} />;
}
