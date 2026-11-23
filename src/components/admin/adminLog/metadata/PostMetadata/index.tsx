import { StatusMessage } from "@/components/admin/adminLog/metadata/StatusMessage";
import {
  getDiffClassName,
  UpdateMetadataSections,
  type DiffVariant,
} from "@/components/admin/adminLog/metadata/UpdateMetadataSections";
import { ImagePreview } from "@/components/images/ImagePreview";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { InputTextArea } from "@/components/ui/InputTextArea";
import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog, PostLogSnapshot } from "@/lib/logs/types/log-types";
import { publishedFilterOptions } from "@/lib/post/enums/publishedFilter";
import { formatDate } from "@/utils/format-datetime";
import {
  ArchiveRestoreIcon,
  Calendar1Icon,
  FileTextIcon,
  LinkIcon,
} from "lucide-react";

type PostMetadataProps = {
  log: ActivityLog;
};

function PostFields({
  snapshot,
  variant,
  changedKeys,
}: {
  snapshot?: Partial<PostLogSnapshot>;
  variant?: DiffVariant;
  changedKeys?: ReadonlySet<string>;
}) {
  if (!snapshot) return null;
  const fieldClassName = (key: string) =>
    getDiffClassName(variant ?? "before", changedKeys?.has(key) ?? false);

  return (
    <>
      {snapshot.title !== undefined && (
        <div className={fieldClassName("title")}>
          <InputText
            labelText="Título"
            icon={FileTextIcon}
            disabled
            defaultValue={snapshot.title}
          />
        </div>
      )}
      {snapshot.slug !== undefined && (
        <div className={fieldClassName("slug")}>
          <InputText
            labelText="Slug"
            icon={LinkIcon}
            disabled
            defaultValue={snapshot.slug}
          />
        </div>
      )}
      {snapshot.excerpt !== undefined && (
        <InputTextArea
          className={`md:col-span-full ${fieldClassName("excerpt")}`}
          labelText="Resumo"
          icon={FileTextIcon}
          disabled
          defaultValue={snapshot.excerpt}
        />
      )}
      {snapshot.content !== undefined && (
        <InputTextArea
          className={`md:col-span-full ${fieldClassName("content")}`}
          labelText="Conteúdo"
          icon={FileTextIcon}
          disabled
          defaultValue={snapshot.content}
        />
      )}
      {snapshot.published !== undefined && (
        <div className={fieldClassName("published")}>
          <InputSelect
            labelText="Publicado"
            options={publishedFilterOptions}
            defaultValue={snapshot.published ? "true" : "false"}
            disabled
          />
        </div>
      )}
      {snapshot.coverImage !== undefined &&
        (snapshot.coverImage ? (
          <div
            className={`md:col-span-full ${fieldClassName("coverImage")}`}
          >
            <ImagePreview imageSrc={snapshot.coverImage} />
          </div>
        ) : (
          <div
            className={`md:col-span-full ${fieldClassName("coverImage")}`}
          >
            <span>Sem imagem de capa</span>
          </div>
        ))}
      {snapshot.updatedAt !== undefined && (
        <div className={fieldClassName("updatedAt")}>
          <InputText
            labelText="Atualizado em"
            icon={Calendar1Icon}
            disabled
            defaultValue={formatDate(snapshot.updatedAt)}
          />
        </div>
      )}
    </>
  );
}

export function PostMetadata({ log }: PostMetadataProps) {
  switch (log.action) {
    case ActionType.UPDATED: {
      const before = log.metadata.before as Partial<PostLogSnapshot>;
      const after = log.metadata.after as Partial<PostLogSnapshot>;

      return (
        <UpdateMetadataSections
          before={before}
          after={after}
          renderFields={(snapshot, variant, changedKeys) => (
            <PostFields
              snapshot={snapshot}
              variant={variant}
              changedKeys={changedKeys}
            />
          )}
        />
      );
    }

    case ActionType.CREATED:
      return (
        <PostFields snapshot={log.metadata.created as Partial<PostLogSnapshot>} />
      );

    case ActionType.DELETED:
      return (
        <PostFields snapshot={log.metadata.deleted as Partial<PostLogSnapshot>} />
      );

    case ActionType.RESTORED:
      return (
        <StatusMessage
          text="Post foi restaurado"
          icon={ArchiveRestoreIcon}
          tone="success"
        />
      );

    default:
      return null;
  }
}
