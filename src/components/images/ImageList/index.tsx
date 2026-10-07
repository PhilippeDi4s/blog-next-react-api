"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { SingleImage } from "../SingleImage";
import { ImageResponseDto } from "@/lib/image/schema";

type ImageListProps = {
  images: ImageResponseDto[];
};

export function ImageList({ images }: ImageListProps) {
  const [modal, setModal] = useState(false);
  const [imageData, setImageData] = useState<Partial<ImageResponseDto>>({});

  function openModal(imageData: Partial<ImageResponseDto>) {
    setImageData(imageData);
    setModal(true);
  }
  function closeModal() {
    setImageData({});
    setModal(false);
  }

  return (
    <section
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
      />

      {images.map((image) => {
        return (
          <button
            onClick={() => openModal(image)}
            key={image.id}
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
            <Image src={image.url} alt="Imagem" fill className="object-cover" />
          </button>
        );
      })}
    </section>
  );
}
