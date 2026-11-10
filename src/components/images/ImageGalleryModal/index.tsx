"use client";

import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { Suspense, useRef } from "react";
import { ImageList } from "../ImageList";
import clsx from "clsx";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GalleryVerticalEndIcon } from "lucide-react";
import { getAllImagesOwnedAction } from "@/app/actions/image/get-all-images-owned-action";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { FetchImages } from "@/lib/image/types/fetchImagesType";
import { useInfiniteImages } from "@/lib/image/hooks/useInfiniteImages";

type ImageGalleryModalProps = {
  isOpen: boolean;
  openGallery: () => void;
  closeGallery: () => void;
  fetchImages?: FetchImages;
  disabled?: boolean;
};

export function ImageGalleryModal({
  isOpen,
  openGallery,
  closeGallery,
  fetchImages = getAllImagesOwnedAction,
  disabled,
}: ImageGalleryModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Button type="button" variant="ghost" onClick={openGallery} disabled={disabled}>
        <GalleryVerticalEndIcon />
        Galeria de imagens
      </Button>
      {isOpen && (
        <ModalOverlay onClose={closeGallery}>
          <div
            ref={scrollContainerRef}
            className={clsx(
              "p-6",
              "mt-2",
              "md:mt-8",
              "rounded-2xl",
              "max-w-4xl",
              "h-[90dvh]",
              "md:h-[70vh]",
              "mx-auto",
              "bg-slate-800",
              "shadow-xl/20",
              "overflow-y-auto",
              "admin-scrollbar",
              "flex",
              "flex-col",
              "items-center",
              "gap-6",
            )}
          >
            <Heading as="h1" className="mt-8">
              Galeria de Imagens
            </Heading>
            <Suspense fallback={<SpinLoader />}>
              <ImageGalleryModalContent
                fetchImages={fetchImages}
                scrollContainerRef={scrollContainerRef}
              />
            </Suspense>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}

type ImageGalleryModalContentProps = {
  fetchImages: FetchImages;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

function ImageGalleryModalContent({
  fetchImages,
  scrollContainerRef,
}: ImageGalleryModalContentProps) {
  const {
    images,
    loading,
    loadingMore,
    hasMore,
    errorMessage,
    observerRef,
    removeImage,
    retry,
  } = useInfiniteImages({ fetchImages, scrollContainerRef });

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
    return (
      <ErrorMessage
        content={errorContent}
        contentTitle="Não foi possível carregar as imagens"
      />
    );
  }

  if (images.length === 0) {
    return (
      <ErrorMessage
        content="Nenhuma imagem encontrada. Adicione uma imagem para começar."
        contentTitle="Nenhuma imagem encontrada"
      />
    );
  }

  return (
    <>
      <ImageList
        images={images}
        bottomCopyUrlButton={true}
        onImageDeleted={removeImage}
      />

      {hasMore && !errorMessage && (
        <div ref={observerRef} className="flex w-full justify-center py-4">
          {loadingMore && <SpinLoader />}
        </div>
      )}

      {errorMessage && (
        <ErrorMessage
          content={errorContent}
          contentTitle="Erro ao carregar mais imagens"
        />
      )}
    </>
  );
}
