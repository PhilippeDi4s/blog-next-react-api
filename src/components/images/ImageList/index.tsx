"use client";

import clsx from "clsx";
import { useState } from "react";
import { SingleImage } from "../SingleImage";
import { ImageResponseDto } from "@/lib/image/schema";
import { ImageWithFallback } from "@/components/ui/ImageFallback";
import { CopyTextButton } from "@/components/ui/CopyTextButton";

type ImageListProps = {
  images: ImageResponseDto[];
  bottomCopyUrlButton?: boolean;
  onImageDeleted?: (id: string) => void;
};

export function ImageList({
  images,
  bottomCopyUrlButton = false,
  onImageDeleted,
}: ImageListProps) {
  const [modal, setModal] = useState(false);
  const imageInitialState: ImageResponseDto = {
    createdAt: "",
    id: "",
    uploadedBy: {
      id: "",
      name: "",
      email: "",
    },
    url: "",
  };
  const [imageData, setImageData] = useState<ImageResponseDto>(imageInitialState);

  function openModal(image: ImageResponseDto) {
    setImageData(image);
    setModal(true);
  }
  function closeModal() {
    setImageData(imageInitialState);
    setModal(false);
  }

  return (
    <div
      className={clsx(
        "w-full",
        "grid",
        "grid-cols-1",
        "p-2",
        "gap-8",
        "min-[30rem]:grid-cols-2",
        "md:gap-10",
        "min-[56rem]:grid-cols-3",
        "2xl:grid-cols-4",
      )}
    >
      <SingleImage
        imageData={imageData}
        isModalOpen={modal}
        setModalClose={closeModal}
        onImageDeleted={onImageDeleted}
      />

      {images.map((image) => {
        return (
          <div className="flex flex-col gap-3" key={image.id}>
            <button
              type="button"
              onClick={() => openModal(image)}
              className="
            relative 
            aspect-square 
            overflow-hidden 
            rounded 
            cursor-pointer 
            transition
            lg:hover:scale-105
            "
            >
              <ImageWithFallback
                src={image?.url}
                alt="Imagem"
                containerClassName="h-full"
                imageClassName="object-cover"
              />
            </button>
            {bottomCopyUrlButton && (
              <CopyTextButton
                buttonText="Copiar URL"
                textToCopy={image.url}
                variant="ghost"
                size="sm"
                className="w-fit mx-auto px-5"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
