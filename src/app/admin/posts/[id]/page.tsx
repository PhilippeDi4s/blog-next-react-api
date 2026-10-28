import { PostAdminForm } from "@/components/admin/PostAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Heading } from "@/components/ui/Heading";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { getPostById } from "@/lib/post/queries/admin";
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
    <>
      <Heading as="h2">Editar Post</Heading>
      <Suspense fallback={<SpinLoader />}>
        <AdminPostIdPageContent params={params} />
      </Suspense>
    </>
  );
}

export async function AdminPostIdPageContent({ params }: AdminPostIdPageProps) {
  const { id } = await params;
  const res = await getPostById(id);

  if (!res.success) {
    redirectWithNotice("*", Notice.POST_NOT_FOUND);
  }


  return (
    <PostAdminForm
      initialData={res.data}
    />
  );
}
