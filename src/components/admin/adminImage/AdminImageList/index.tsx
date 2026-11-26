"use client";

import { CopyTextButton } from "@/components/ui/CopyTextButton";
import { ImageResponseDto } from "@/lib/image/schema";
import { formatDate } from "@/utils/format-datetime";
import { Calendar1Icon, ImageIcon, UserIcon } from "lucide-react";
import { ImagePreview } from "@/components/images/ImagePreview";
import { AdminList } from "../../AdminList";
import { ErrorMessage } from "@/components/feedBack/ErrorMessage";

type AdminImageListProps = {
  images: ImageResponseDto[];
};

export function AdminImageList({ images }: AdminImageListProps) {
  if (!images) {
    return (
      <ErrorMessage
        content="Nenhuma imagem Registrado"
        contentTitle="Nenhuma imagem encontrada"
        pageTitle="Lista de Imagens"
      />
    );
  }

  return (
    <AdminList
      items={images}
      getRowKey={(image) => image.id}
      getRowHref={(image) => `/admin/images/${image.id}`}
      noDataMessage={{
        pageTitle: "Imagens",
        emptyMessageTitle: "Nenhuma imagem encontrada",
        emptyMessage: "Ainda não há imagens cadastradas.",
      }}
      columns={[
        {
          header: "Preview",
          headerIcon: ImageIcon,
          cell: (image) => (
            <div className="relative w-[6rem] h-[6rem]">
              <ImagePreview
                imageSrc={image.url}
                triggerClassName="h-full w-full"
                thumbnailContainerClassName="w-full h-full"
                thumbnailImageClassName="cursor-zoom-in rounded-xl object-cover object-top transition hover:scale-105 hover:ring-2 hover:ring-blue-500"
              />
            </div>
          ),
        },
        {
          header: "URL",
          headerIcon: ImageIcon,
          cell: (image) => (
            <CopyTextButton
              buttonText="Copiar URL"
              textToCopy={image.url}
              variant="ghost"
              size="sm"
            />
          ),
        },
        {
          header: "Enviado por",
          headerIcon: UserIcon,
          cell: (image) => (
            <div className="flex flex-col">
              <span className="truncate">{image.uploadedBy?.name ?? "Usuário excluído"}</span>
              <span className="truncate text-sm opacity-70">
                {image.uploadedBy?.email ?? "—"}
              </span>
            </div>
          ),
          className: "max-w-60",
        },
        {
          header: "Criado em",
          headerIcon: Calendar1Icon,
          cell: (image) => formatDate(image.createdAt),
        },
      ]}
    />
  );
}
