"use client";

import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { Suspense, useEffect, useState } from "react";
import { ImageList } from "../ImageList";
import clsx from "clsx";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GalleryVerticalEndIcon } from "lucide-react";
import { getAllImagesOwnedAction } from "@/app/actions/image/get-all-images-owned-action";
import { ImageResponseDto } from "@/lib/image/schema";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { FetchImages } from "@/lib/image/types/imageGalleryModalType";


type ImageGalleryModalProps = {
  isOpen: boolean;
  openGallery: () => void;
  closeGallery: () => void;
  fetchImages?: FetchImages;
};

export function ImageGalleryModal({
  isOpen,
  openGallery,
  closeGallery,
  fetchImages = getAllImagesOwnedAction,
}: ImageGalleryModalProps) {
  return (
    <>
      <Button type="button" variant="ghost" onClick={openGallery}>
        <GalleryVerticalEndIcon />
        Galeria de imagens
      </Button>
      {isOpen && (
        <ModalOverlay onClose={closeGallery}>
          <div
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
              <ImageGalleryModalContent fetchImages={fetchImages} />
            </Suspense>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}

type ImageGalleryModalContentProps = {
  fetchImages: FetchImages;
};

function ImageGalleryModalContent({
  fetchImages,
}: ImageGalleryModalContentProps) {
  const [images, setImages] = useState<ImageResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageDeleted = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      try {
        const res = await fetchImages();

        if (cancelled) return;

        if (!res.success) {
          setErrorMessage(
            res.errors[0]?.message ?? "Não foi possível carregar as imagens.",
          );
          return;
        }

        setImages(res.data);
      } catch {
        if (!cancelled) {
          setErrorMessage("Não foi possível carregar as imagens.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadImages();
    return () => {
      cancelled = true;
    };
  }, [fetchImages]);

  if (loading) return <SpinLoader />;
  if (errorMessage) {
    return (
      <ErrorMessage
        content={errorMessage}
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
    <ImageList
      images={images}
      bottomCopyUrlButton={true}
      onImageDeleted={handleImageDeleted}
    />
  );
}
