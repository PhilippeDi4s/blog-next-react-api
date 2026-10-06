"use client";

import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { ImageResponseDto } from "@/lib/image/schema";
import { formatDateTime } from "@/utils/format-datetime";
import clsx from "clsx";
import { UserIcon, MailIcon, Calendar1Icon } from "lucide-react";
import Image from "next/image";
import { DeleteImageButton } from "../DeleteImageButton";

type ImageData = Partial<ImageResponseDto>;

type SingleImageProps = {
  isModalOpen: boolean;
  setModalClose: () => void;
  imageData: ImageData;
};

export function SingleImage({
  isModalOpen,
  setModalClose,
  imageData,
}: SingleImageProps) {
  return (
    <>
      {isModalOpen && (
        <ModalOverlay onClose={setModalClose}>
          <div
            className={clsx(
              "bg-mauve-800",
              "w-[70%]",
              "h-[80vh]",
              "text-[clamp(0.875rem4vw1.25rem)]",
              "mx-auto",
              "rounded-2xl",
              "mt-5",
              "overflow-x-hidden",
              "overflow-y-auto",
              "flex",
              "flex-col",
              "gap-4",
              "lg:w-[90%]",
              "lg:flex-row",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              alt=""
              src={imageData.url || ""}
              width={300}
              height={300}
              className="w-full rounded-xl object-cover object-top max-h-60 md:max-h-80 lg:max-h-none lg:max-w-140 xl:max-w-none"
            />
            <div className="w-full flex flex-col items-center gap-6 p-3 lg:mt-20">
              <div className="flex flex-col text-center">
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>Usuário</span>
                  <UserIcon className="size-[1em]" />
                </div>
                <span>{imageData.uploadedBy?.name}</span>
              </div>
              <div className="flex flex-col text-center">
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>E-mail</span>
                  <MailIcon className="size-[1em]" />
                </div>
                <span>{imageData.uploadedBy?.email}</span>
              </div>
              <div className="flex flex-col text-center">
                <div className="flex justify-center items-center gap-2 font-bold">
                  <span>Data de upload</span>
                  <Calendar1Icon className="size-[1em]" />
                </div>
                <span>
                  {imageData.createdAt
                    ? formatDateTime(imageData.createdAt)
                    : "Data indisponível"}
                </span>
              </div>
              <div className="flex flex-col gap-5 items-center justify-center w-full">
                <CopyLinkButton
                  className="font-semibold"
                  variant="default"
                  text="Copiar link da imagem"
                  url={imageData.url || ""}
                />
                <DeleteImageButton
                  id={imageData.id!}
                  onDeleted={setModalClose}
                />
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}
