import { ImagePreview } from "@/components/images/ImagePreview";
import { InputText } from "@/components/ui/InputText";
import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog, ImageLogSnapshot } from "@/lib/logs/types/log-types";
import { formatDate } from "@/utils/format-datetime";

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
          <InputText labelText="URL" disabled defaultValue={snapshot.url} />
        </>
      )}
      {snapshot.createdAt !== undefined && (
        <InputText
          labelText="Criada em"
          disabled
          defaultValue={formatDate(snapshot.createdAt)}
        />
      )}
      {snapshot.uploadedById !== undefined && (
        <InputText
          labelText="ID de quem enviou"
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
