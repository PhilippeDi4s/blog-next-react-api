import { PostAdminForm } from "@/components/admin/adminPost/PostAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { BackButton } from "@/components/ui/BackButton";
import { Heading } from "@/components/ui/Heading";
import { getPostById } from "@/lib/post/queries/admin-post";
import { Metadata } from "next";
import { Suspense } from "react";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { PostDataAdmin } from "@/components/admin/adminPost/PostDataAdmin";

export const metadata: Metadata = {
  title: "Editar post",
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  return (
    <section className="flex flex-col gap-4">
      <BackButton pathLabel="Admin / Lista de Posts" />
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
    return (
      <ErrorMessage
        contentTitle="Não foi possível carregar o post"
        content={
          res.errors[0]?.message ?? "Tente novamente em alguns instantes."
        }
      />
    );
  }

  return (
    <>
      <PostDataAdmin post={res.data} />
      <Heading as="h1">Editar Post</Heading>

      <PostAdminForm initialData={res.data} />
    </>
  );
}
