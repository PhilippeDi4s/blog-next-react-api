import { PostAdminForm } from "@/components/admin/adminPost/PostAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { BackButton } from "@/components/ui/BackButton";
import { Heading } from "@/components/ui/Heading";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { getPostById } from "@/lib/post/queries/admin-post";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Editar post",
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  return (
    <section className="flex flex-col gap-3">
      <BackButton pathLabel="Admin / Lista de Posts" />
      <Heading as="h1">Editar Post</Heading>
      <Suspense fallback={<SpinLoader />}>
        <AdminPostIdPageContent params={params} />
      </Suspense>
    </section>
  );
}

export async function AdminPostIdPageContent({ params }: AdminPostIdPageProps) {
  const { id } = await params;
  const res = await getPostById(id);

  if (!res.success) {
    redirectWithNotice("*", Notice.POST_NOT_FOUND);
  }

  return <PostAdminForm initialData={res.data} />;
}
