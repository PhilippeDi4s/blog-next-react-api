import { ImageAdminForm } from "@/components/admin/adminImage/ImageAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { BackButton } from "@/components/ui/BackButton";
import { Heading } from "@/components/ui/Heading";
import { getImagesById } from "@/lib/image/queries/admin-image";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { Suspense } from "react";

type AdminPImageIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminPImageIdPage({ params }: AdminPImageIdPageProps) {
  return (
    <section className="flex flex-col gap-3">
      <BackButton pathLabel="Admin / Lista de Imagens" />
      <Heading as="h1">Editar Imagem</Heading>
      <Suspense fallback={<SpinLoader />}>
        <AdminPImageIdPageContent params={params} />
      </Suspense>
    </section>
  );
}

export async function AdminPImageIdPageContent({
  params,
}: AdminPImageIdPageProps) {
  const { id } = await params;
  const res = await getImagesById(id);

  if (!res.success) {
    redirectWithNotice("*", Notice.IMAGE_NOT_FOUND);
  }

  return <ImageAdminForm imageData={res.data} />;
}
