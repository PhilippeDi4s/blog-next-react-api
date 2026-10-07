"use client";

import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { ImageResponseDto } from "@/lib/image/schema";
import { formatDateTime } from "@/utils/format-datetime";
import { UserIcon, MailIcon, Calendar1Icon } from "lucide-react";
import Image from "next/image";
import { DeleteImageButton } from "../DeleteImageButton";
import { useState } from "react";
import { SpinLoader } from "@/components/feedBack/SpinLoader";

type ImageData = Partial<ImageResponseDto>;

type SingleImageProps = {
  isModalOpen: boolean;
  setModalClose: () => void;
  imageData: ImageData;
};

const infoContainerClass = "flex flex-col text-center w-full min-w-0";

const infoHeaderClass = "flex justify-center items-center gap-2 font-bold";

export function SingleImage({
  isModalOpen,
  setModalClose,
  imageData,
}: SingleImageProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const imageInfo = [
    {
      label: "Usuário",
      value: imageData.uploadedBy?.name,
      icon: UserIcon,
    },
    {
      label: "E-mail",
      value: imageData.uploadedBy?.email,
      icon: MailIcon,
    },
    {
      label: "Data de upload",
      value: imageData.createdAt
        ? formatDateTime(imageData.createdAt)
        : "Data indisponível",
      icon: Calendar1Icon,
    },
  ];
  return (
    <>
      {isModalOpen && (
        <ModalOverlay onClose={setModalClose}>
          <div
            className="
              bg-slate-800
              w-[95%]
              h-[80vh]
              text-[clamp(0.875rem,2.5vw,1.25rem)]
              mx-auto
              rounded-2xl
              mt-5
              overflow-x-hidden
              overflow-y-auto
              flex
              flex-col
              gap-4
              min-[56rem]:w-[90%]
              min-[56rem]:flex-row
            "
          >
            <div className="relative shrink-0 aspect-[5/3] md:aspect-[7/3] w-full min-[56rem]:aspect-auto min-[56rem]:w-[60%]">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <SpinLoader />
                </div>
              )}

              <Image
                alt=""
                src={imageData.url || ""}
                fill
                onLoad={() => setImageLoading(false)}
                className="
                  rounded-xl
                  object-cover
                  object-top
                "
              />
            </div>

            <div className="w-full min-w-0 flex flex-col items-center gap-6 p-3  min-[56rem]:mt-20">
              {imageInfo.map(({ label, value, icon: Icon }) => (
                <div key={label} className={infoContainerClass}>
                  <div className={infoHeaderClass}>
                    <span>{label}</span>
                    <Icon className="size-[1em]" />
                  </div>

                  <span className="truncate max-w-full">{value}</span>
                </div>
              ))}

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
