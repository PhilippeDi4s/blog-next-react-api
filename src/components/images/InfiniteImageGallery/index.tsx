"use client";

import { getAllImagesOwnedAction } from "@/app/actions/image/get-all-images-owned-action";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ImageList } from "@/components/images/ImageList";
import { Button } from "@/components/ui/Button";
import { useInfiniteImages } from "@/lib/image/hooks/useInfiniteImages";
import { FetchImages } from "@/lib/image/types/fetchImagesType";

type InfiniteImageGalleryProps = {
  fetchImages?: FetchImages;
};

export function InfiniteImageGallery({
  fetchImages = getAllImagesOwnedAction,
}: InfiniteImageGalleryProps) {
  const {
    images,
    loading,
    loadingMore,
    hasMore,
    errorMessage,
    observerRef,
    removeImage,
    retry,
  } = useInfiniteImages({ fetchImages });

  const errorContent = (
    <div className="flex flex-col items-center gap-4">
      <p>{errorMessage}</p>
      <Button type="button" variant="ghost" onClick={retry}>
        Tentar novamente
      </Button>
    </div>
  );

  if (loading) return <SpinLoader />;

  if (errorMessage && images.length === 0) {
    return <ErrorMessage contentTitle="Ei 😅" content={errorContent} />;
  }

  if (images.length === 0) {
    return (
      <ErrorMessage contentTitle="Opa 😅" content="Nenhuma imagem adicionada" />
    );
  }

  return (
    <>
      <ImageList images={images} onImageDeleted={removeImage} />

      {hasMore && !errorMessage && (
        <div ref={observerRef} className="flex w-full justify-center py-4">
          {loadingMore && <SpinLoader />}
        </div>
      )}

      {errorMessage && (
        <ErrorMessage
          contentTitle="Erro ao carregar mais imagens"
          content={errorContent}
        />
      )}
    </>
  );
}
