"use client";

import { ErrorMessage } from "@/components/feedBack/ErrorMessage";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { getAllImages } from "@/lib/post/queries/images";
import { ImageModel } from "@/models/image/image-model";
import clsx from "clsx";
import { Calendar1Icon, MailIcon, UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_IMAGE_DATA: Partial<ImageModel> = {
  created_at: "",
  uploaded_by: {
    email: "",
    name: "",
  },
  url: "",
};

export function ImageList() {
  const [images, setImages] = useState<ImageModel[]>([]);
  const [modal, setModal] = useState(false);
  const [imageData, setImageData] =
    useState<Partial<ImageModel>>(DEFAULT_IMAGE_DATA);

  function openModal(
    url: string,
    name: string,
    email: string,
    createdAt: string,
  ) {
    setImageData({
      uploaded_by: {
        name: name,
        email: email,
      },
      created_at: createdAt,
      url: url,
    });
    setModal(true);
  }
  function closeModal() {
    setImageData(DEFAULT_IMAGE_DATA);
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
      {!!modal && (
        <div
          className="absolute top-0 left-0 z-99 w-screen min-h-screen backdrop-blur-sm bg-black/10 px-2 py-4"
          onClick={closeModal}
        >
          <button
            type="button"
            className="ml-0 bg-mauve-800 p-2 rounded-full cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              closeModal();
            }}
          >
            <XIcon />
          </button>
          <div
            className="bg-mauve-800 w-[90%] h-[80vh] mx-auto rounded-2xl mt-5 overflow-x-hidden overflow-y-auto flex flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              alt=""
              src={imageData.url || ""}
              width={300}
              height={300}
              className="w-full rounded-xl object-cover object-top max-h-60"
            />
            <div className="w-full flex flex-col items-center gap-6 p-3">
              <div className="flex flex-col text-center">
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>Usuário</span>
                  <UserIcon className="size-[1em]" />
                </div>
                <span>{imageData.uploaded_by?.name}</span>
              </div>
              <div className="flex flex-col text-center">
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>E-mail</span>
                  <MailIcon className="size-[1em]" />
                </div>
                <span>{imageData.uploaded_by?.email}</span>
              </div>
              <div className="flex flex-col text-center">
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>Data de criação</span>
                  <Calendar1Icon className="size-[1em]" />
                </div>
                <span>{imageData.created_at}</span>
              </div>
              <span className="text-sm font-bold">
                <CopyLinkButton
                  text="Copiar link da imagem"
                  url={imageData.url || ""}
                />
              </span>
            </div>
          </div>
        </div>
      )}
      {images.map((image) => {
        return (
          <button
            onClick={() =>
              openModal(
                image.url,
                image.uploaded_by.name,
                image.uploaded_by.email,
                image.created_at,
              )
            }
            key={image.image_id}
            className="relative aspect-square overflow-hidden rounded"
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
