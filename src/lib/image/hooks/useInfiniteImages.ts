"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageResponseDto } from "@/lib/image/schema";
import { FetchImages } from "@/lib/image/types/fetchImagesType";

type UseInfiniteImagesParams = {
  fetchImages: FetchImages;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
};

export function useInfiniteImages({
  fetchImages,
  scrollContainerRef,
}: UseInfiniteImagesParams) {
  const [images, setImages] = useState<ImageResponseDto[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement>(null);
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
          return [
            ...prev,
            ...pageImages.filter((image) => !existingIds.has(image.id)),
          ];
        });

        const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
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

  useEffect(() => {
    const target = observerRef.current;

    if (!target || !hasMore || errorMessage) return;

    if (scrollContainerRef && !scrollContainerRef.current) return;
    const root = scrollContainerRef?.current ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) void loadImages(page);
      },
      { root, rootMargin: "0px 0px 200px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [page, hasMore, errorMessage, loadImages, scrollContainerRef]);

  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;
    void loadImages(1);
  }, [loadImages]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  const retry = useCallback(() => void loadImages(page), [loadImages, page]);

  return {
    images,
    loading,
    loadingMore,
    hasMore,
    errorMessage,
    observerRef,
    removeImage,
    retry,
  };
}
