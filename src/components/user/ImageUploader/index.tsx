"use client";

import { showMessage } from "@/lib/show-message";
import { uploadImageAction } from "@/app/actions/upload/upoad-image-action";
import { Button } from "@/components/ui/Button";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";

type ImageUploaderProps = {
  disabled?: boolean;
  actions?: React.ReactNode;
};

export function ImageUploader({ disabled, actions }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState("");

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

      if (result.error) {
        showMessage.error(result.error);
        fileInput.value = "";
        return;
      }

      setImgUrl(result.url);
    });
  }
  return (
    <div className="py-4">
      <div className="flex items-center gap-6">
        <Button
          type="button"
          onClick={handleChooseFile}
          disabled={isUploading || disabled}
        >
          <ImageUpIcon /> Enviar uma imagem
        </Button>

        {actions}
      </div>

      {!!imgUrl && (
        <div className="flex flex-col gap-8 mt-8">
          {/* eslint-disable-next-line */}
          <img
            className="w-96 max-h-96 max-w-96 rounded"
            alt="Imagem do post"
            src={imgUrl}
          />
          <span>
            <b className="uppercase">url:</b> {imgUrl}
          </span>
        </div>
      )}

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
