import { ManagePostForm } from "@/components/user/ManagePostForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { findPostByIdAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PublicPostSchema } from "@/lib/post/schemas";

export const metadata: Metadata = {
  title: "Editar post",
};

type AdminPostsIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminPostsIdPage({ params }: AdminPostsIdPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar Post</h1>
      <Suspense fallback={<SpinLoader />}>
        <PostEditPageContent params={params} />
      </Suspense>
    </div>
  );
}

export async function PostEditPageContent({ params }: AdminPostsIdPageProps) {
  const { id } = await params;

  const postRes = await findPostByIdAdmin(id);

  if (!postRes.success) {
    console.log(postRes.errors);
    notFound();
  }

  const post = postRes.data;
  const publicPost = PublicPostSchema.parse(post);

  return <ManagePostForm mode="update" publicPost={publicPost} />;
}
