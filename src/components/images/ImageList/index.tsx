"use client";

import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { getAllImages } from "@/lib/image/queries/images";
import { ImageModel } from "@/models/image/image-model";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SingleImage } from "../SingleImage";

export function ImageList() {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [modal, setModal] = useState(false);
  const [imageData, setImageData] = useState<Partial<ImageModel>>({});

  function openModal(imageData: Partial<ImageModel>) {
    setImageData(imageData)
    setModal(true);
  }
  function closeModal() {
    setImageData({});
    setModal(false);
  }

  useEffect(() => {
    const fecthData = async () => {
      const imagesRes = await getAllImages();

      if (!imagesRes.success) {
        console.log(imagesRes.errors);
        return (
          <ErrorMessage
            contentTitle="Ei 😅"
            content="Não foi possível carregar as imagens. Tente novamente em alguns instantes"
          />
        );
      }

      setImages(imagesRes.data);

      if (images.length <= 0) {
        return (
          <ErrorMessage
            contentTitle="Opa 😅"
            content="Nenhuma imagem adicionada"
          />
        );
      }
    };
    fecthData();
  }, [images.length]);

  console.log(images);
  return (
    <section
      className={clsx(
        "w-full grid grid-cols-2 p-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      <SingleImage imageData={imageData} isModalOpen={modal} setModalClose={closeModal}/>

      {images.map((image) => {
        return (
          <button
            onClick={() =>
              openModal(image)
            }
            key={image.image_id}
            className="relative aspect-square overflow-hidden rounded cursor-pointer lg:hover:scale-105 transition"
          >
            <Image
              src={image.url}
              alt="Imagem"
              fill
              sizes="(max-width: 768px) 50vw,
              (max-width: 1024px) 33vw,
              (max-width: 1280px) 25vw,
              20vw"
              className="object-cover"
            />
          </button>
        );
      })}
    </section>
  );
}
