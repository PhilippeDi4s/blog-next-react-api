import { CopyTextButton } from "@/components/ui/CopyTextButton";
import { ImageResponseDto } from "@/lib/image/schema";
import { formatDate } from "@/utils/format-datetime";
import { AdminList } from "../AdminList";
import { Calendar1Icon, ImageIcon, IdCardIcon, UserIcon } from "lucide-react";

type ImageListProps = {
  images: ImageResponseDto[];
};

export function ImageList({ images }: ImageListProps) {
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
          header: "ID",
          headerIcon: IdCardIcon,
          cell: (image) => (
            <CopyTextButton
              buttonText="Copiar id"
              textToCopy={image.id}
              variant="ghost"
              size="sm"
            />
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
              <span className="truncate">{image.uploadedBy.name}</span>
              <span className="truncate text-sm opacity-70">
                {image.uploadedBy.email}
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
