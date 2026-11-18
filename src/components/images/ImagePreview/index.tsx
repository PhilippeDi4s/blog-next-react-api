"use client";

import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { ImageWithFallback } from "@/components/ui/ImageFallback";
import { useState } from "react";

type ImagePreviewProps = {
  imageSrc?: string | null;
  alt?: string;
  triggerClassName?: string;
  thumbnailContainerClassName?: string;
  thumbnailImageClassName?: string;
  intrinsic?: boolean;
  onImageLoad?: () => void;
  children?: React.ReactNode;
};

export function ImagePreview({
  imageSrc,
  alt = "",
  triggerClassName = "relative block w-full cursor-zoom-in",
  thumbnailContainerClassName = "w-full aspect-video",
  thumbnailImageClassName = "rounded-xl object-cover transition hover:scale-105 hover:ring-2 hover:ring-blue-500",
  intrinsic,
  onImageLoad,
  children,
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!imageSrc) return null;

  function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={handleOpen}
        aria-label="Ampliar imagem"
        data-no-row-hover
      >
        <ImageWithFallback
          alt={alt}
          src={imageSrc}
          intrinsic={intrinsic}
          onLoad={onImageLoad}
          containerClassName={thumbnailContainerClassName}
          imageClassName={thumbnailImageClassName}
        />
        {children}
      </button>
      {isOpen && (
        <ModalOverlay onClose={() => setIsOpen(false)}>
          <ImageWithFallback
            alt={alt}
            src={imageSrc}
            containerClassName="w-[60%] h-[80vh] mx-auto"
            imageClassName="rounded-xl object-cover object-top"
          />
        </ModalOverlay>
      )}
    </>
  );
}
