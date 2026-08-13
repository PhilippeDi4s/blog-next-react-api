import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { ImageModel } from "@/models/image/image-model";
import { XIcon, UserIcon, MailIcon, Calendar1Icon } from "lucide-react";
import Image from "next/image";

type ImageData = Partial<ImageModel>;

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
        <div
          className="absolute top-0 left-0 z-99 w-screen min-h-screen backdrop-blur-sm bg-black/10 px-2 py-4"
          onClick={setModalClose}
        >
          <button
            type="button"
            className="ml-0 bg-mauve-800 p-2 rounded-full cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              setModalClose();
            }}
          >
            <XIcon />
          </button>
          <div
            className="bg-mauve-800 w-[70%] h-[80vh] text-[clamp(0.875rem,4vw,1.25rem)] mx-auto rounded-2xl mt-5 overflow-x-hidden overflow-y-auto flex flex-col gap-4 lg:w-[90%] lg:flex-row"
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
                  <span>Data de upload</span>
                  <Calendar1Icon className="size-[1em]" />
                </div>
                <span>{imageData.created_at}</span>
              </div>
              <span className="text-sm font-bold lg:mt-10">
                <CopyLinkButton
                  className="font-semibold"
                  variant="default"
                  text="Copiar link da imagem"
                  url={imageData.url || ""}
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
