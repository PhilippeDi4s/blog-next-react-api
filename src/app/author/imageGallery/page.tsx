import { ImageList } from "@/components/images/ImageList";
import { getAllImagesOwned } from "@/lib/image/queries/images";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { Suspense } from "react";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ImageUploader } from "@/components/user/ImageUploader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Gallery",
};

export default async function ImageGalleryPage() {
  return (
    <>
      <ImageUploader showPreview={false} />
      <Suspense fallback={<SpinLoader />}>
        <ImageListRes />
      </Suspense>
    </>
  );
}

async function ImageListRes() {
  const imagesRes = await getAllImagesOwned();

  if (!imagesRes.success) {
    return (
      <ErrorMessage
        contentTitle="Ei 😅"
        content="Não foi possível carregar as imagens. Tente novamente em alguns instantes"
      />
    );
  }

  if (imagesRes.data.length === 0) {
    return (
      <ErrorMessage contentTitle="Opa 😅" content="Nenhuma imagem adicionada" />
    );
  }
  return <ImageList images={imagesRes.data} />;
}
