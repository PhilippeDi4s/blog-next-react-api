"use client";

import { showMessage } from "@/lib/notifications/toast/show-message";
import { uploadImageAction } from "@/app/actions/image/upload-image-action";
import { Button } from "@/components/ui/Button";
import { ImageMinusIcon, ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CopyTextButton } from "@/components/ui/CopyTextButton";
import { ImageWithFallback } from "@/components/ui/ImageFallback";
import { ImagePreview } from "@/components/images/ImagePreview";

type ImageUploaderProps = {
  showPreview: boolean;
  disabled?: boolean;
  actions?: React.ReactNode;
  className?: string;
};

export function ImageUploader({
  showPreview,
  disabled,
  actions,
  className,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState("");
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const router = useRouter();

  function handleOpenImagePreview() {
    setOpenImagePreview(true);
  }

  function handleCloseImagePreview() {
    setOpenImagePreview(false);
  }

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange() {
    showMessage.dismiss();
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    const imageMaxUploadSize = Number(
      process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE || 921600,
    );

    if (file.size > imageMaxUploadSize) {
      const readbleMaxSize = (imageMaxUploadSize / 1024).toFixed(2);
      showMessage.error(`Imagem muito grande. Máx: ${readbleMaxSize}KB.`);

      fileInput.value = "";
      return;
    }

    const allowedTypesEnv = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES || "";

    const allowedTypes = allowedTypesEnv.split(",").map((type) => type.trim());

    if (!allowedTypes?.includes(file.type)) {
      showMessage.error("Formato de imagem não permitido.");

      fileInput.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fileInput.value = "";
    startTransition(async () => {
      const result = await uploadImageAction(formData);

      showMessage.dismiss();
      if (result.errors.length > 0) {
        result.errors.forEach((error) => {
          const messages = Array.isArray(error.message)
            ? error.message
            : [error.message];
          messages.forEach((msg) => showMessage.error(msg));
        });
        return;
      }

      setImgUrl(result.url);

      if (!showPreview) {
        router.refresh();
      }

      showMessage.success("Imagem adicionada à sua galeria!");
    });
  }
  return (
    <div className="py-4 w-full">
      <div className="flex flex-wrap items-center  gap-6">
        <Button
          type="button"
          onClick={handleChooseFile}
          className={className}
          disabled={isUploading || disabled}
        >
          <ImageUpIcon /> Enviar uma imagem
        </Button>

        {actions}
      </div>

      {!!imgUrl && showPreview && (
        <div className="flex gap-5 w-full flex-col mt-5">
          <button onClick={handleOpenImagePreview} className="cursor-zoom-in">
            <ImageWithFallback
              alt="Imagem do post"
              src={imgUrl}
              containerClassName="relative w-80 h-70 rounded md:w-100 md:h-80"
              imageClassName="rounded-2xl object-cover transition hover:scale-105 hover:ring-2 hover:ring-blue-500"
            />
          </button>
          <div className="flex w-full gap-3 items-center">
            <CopyTextButton
              buttonText="Copiar URL da imagem"
              textToCopy={imgUrl}
              variant="default"
            />
            <Button
              type="button"
              variant="danger"
              onClick={() => setImgUrl("")}
            >
              <ImageMinusIcon /> Limpar preview
            </Button>
          </div>
        </div>
      )}

      <ImagePreview
        isOpen={openImagePreview}
        onClose={handleCloseImagePreview}
        imageSrc={imgUrl}
      />

      <input
        ref={fileInputRef}
        className="hidden"
        name="file"
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
