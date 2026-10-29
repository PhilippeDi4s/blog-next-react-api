import { ImageAdminForm } from "@/components/admin/adminImage/ImageAdminForm";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { Heading } from "@/components/ui/Heading";
import { getImagesById } from "@/lib/image/queries/admin-image";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { Suspense } from "react";

type AdminPImageIdPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminPImageIdPage({ params }: AdminPImageIdPageProps) {
  return (
    <>
      <Heading as="h2">Editar Imagem</Heading>
      <Suspense fallback={<SpinLoader />}>
        <AdminPImageIdPageContent params={params} />
      </Suspense>
    </>
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
