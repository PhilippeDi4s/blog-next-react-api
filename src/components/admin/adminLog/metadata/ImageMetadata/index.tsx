import { ImagePreview } from "@/components/images/ImagePreview";
import { InputText } from "@/components/ui/InputText";
import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog, ImageLogSnapshot } from "@/lib/logs/types/log-types";
import { formatDate } from "@/utils/format-datetime";
import { Calendar1Icon, ImageIcon, UserIcon } from "lucide-react";

type ImageMetadataProps = {
  log: ActivityLog;
};

function ImageFields({
  snapshot,
}: {
  snapshot?: Partial<Omit<ImageLogSnapshot, "folder">>;
}) {
  if (!snapshot) return null;

  return (
    <>
      {snapshot.url !== undefined && (
        <>
          <ImagePreview imageSrc={snapshot.url} />
          <InputText
            labelText="URL"
            icon={ImageIcon}
            disabled
            defaultValue={snapshot.url}
          />
        </>
      )}
      {snapshot.createdAt !== undefined && (
        <InputText
          labelText="Criada em"
          icon={Calendar1Icon}
          disabled
          defaultValue={formatDate(snapshot.createdAt)}
        />
      )}
      {snapshot.uploadedById !== undefined && (
        <InputText
          labelText="ID de quem enviou"
          icon={UserIcon}
          disabled
          defaultValue={snapshot.uploadedById ?? "Não registrado"}
        />
      )}
    </>
  );
}

export function ImageMetadata({ log }: ImageMetadataProps) {
  switch (log.action) {
    case ActionType.CREATED:
      return (
        <ImageFields
          snapshot={log.metadata.created as Partial<ImageLogSnapshot>}
        />
      );

    case ActionType.DELETED:
      return (
        <ImageFields
          snapshot={log.metadata.deleted as Partial<ImageLogSnapshot>}
        />
      );

    default:
      return null;
  }
}
