"use client";

import { SpinLoader } from "@/components/feedBack/SpinLoader";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Button type="button" variant="ghost" onClick={openGallery}>
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
  const [images, setImages] = useState<ImageResponseDto[]>([]);
  // Próxima página a ser carregada.
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement>(null);
  // Trava síncrona contra requisições concorrentes (state é assíncrono).
  const loadingRef = useRef(false);
  const initialLoadRef = useRef(false);

  const loadImages = useCallback(
    async (pageToLoad: number) => {
      if (loadingRef.current) return;

      loadingRef.current = true;
      setErrorMessage(null);

      if (pageToLoad === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const res = await fetchImages(pageToLoad);

        if (!res.success) {
          setErrorMessage(
            res.errors[0]?.message ?? "Não foi possível carregar as imagens.",
          );
          return;
        }

        const { data: pageImages, total, limit } = res.data;

        setImages((prev) => {
          const existingIds = new Set(prev.map((image) => image.id));

          const newImages = pageImages.filter(
            (image) => !existingIds.has(image.id),
          );

          return [...prev, ...newImages];
        });

        const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;

        // Página vazia também encerra: evita loop infinito se total/limit
        // vierem inconsistentes da API.
        setHasMore(pageImages.length > 0 && pageToLoad < totalPages);
        setPage(pageToLoad + 1);
      } catch {
        setErrorMessage("Não foi possível carregar as imagens.");
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [fetchImages],
  );

  // Observa a sentinela dentro do container com scroll (root).
  // Recriar o observer a cada `page` faz o callback inicial disparar de novo,
  // o que preenche o container caso a primeira página não o cubra por inteiro.
  // Com erro, o observer fica desligado: a nova tentativa é manual.
  useEffect(() => {
    const target = observerRef.current;
    const root = scrollContainerRef.current;

    if (!target || !root || !hasMore || errorMessage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          void loadImages(page);
        }
      },
      {
        root,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [page, hasMore, loading, errorMessage, loadImages, scrollContainerRef]);

  useEffect(() => {
    if (initialLoadRef.current) return;

    initialLoadRef.current = true;
    void loadImages(1);
  }, [loadImages]);

  const handleImageDeleted = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handleRetry = () => {
    void loadImages(page);
  };

  const errorContent = (
    <div className="flex flex-col items-center gap-4">
      <p>{errorMessage}</p>
      <Button type="button" variant="ghost" onClick={handleRetry}>
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
        onImageDeleted={handleImageDeleted}
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