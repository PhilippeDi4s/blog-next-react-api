import { ImagePreview } from "@/components/images/ImagePreview";
import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { InputSelect } from "@/components/ui/InputSelect";
import { InputText } from "@/components/ui/InputText";
import { InputTextArea } from "@/components/ui/InputTextArea";
import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog, PostLogSnapshot } from "@/lib/logs/types/log-types";
import { publishedFilterOptions } from "@/lib/post/enums/publishedFilter";
import { formatDate } from "@/utils/format-datetime";

type PostMetadataProps = {
  log: ActivityLog;
};

function PostFields({ snapshot }: { snapshot?: Partial<PostLogSnapshot> }) {
  if (!snapshot) return null;

  return (
    <>
      {snapshot.title !== undefined && (
        <InputText labelText="Título" disabled defaultValue={snapshot.title} />
      )}
      {snapshot.slug !== undefined && (
        <InputText labelText="Slug" disabled defaultValue={snapshot.slug} />
      )}
      {snapshot.excerpt !== undefined && (
        <InputTextArea
          labelText="Resumo"
          disabled
          defaultValue={snapshot.excerpt}
        />
      )}
      {snapshot.content !== undefined && (
        <InputTextArea
          labelText="Conteúdo"
          disabled
          defaultValue={snapshot.content}
        />
      )}
      {snapshot.published !== undefined && (
        <InputSelect
          labelText="Publicado"
          options={publishedFilterOptions}
          defaultValue={snapshot.published ? "true" : "false"}
          disabled
        />
      )}
      {snapshot.coverImage !== undefined &&
        (snapshot.coverImage ? (
          <ImagePreview imageSrc={snapshot.coverImage} />
        ) : (
          <span>Sem imagem de capa</span>
        ))}
      {snapshot.updatedAt !== undefined && (
        <InputText
          labelText="Atualizado em"
          disabled
          defaultValue={formatDate(snapshot.updatedAt)}
        />
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
        <>
          <CollapsibleSection toggleBtnContent={<>Antes</>}>
            <PostFields snapshot={before} />
          </CollapsibleSection>
          <CollapsibleSection toggleBtnContent={<>Depois</>}>
            <PostFields snapshot={after} />
          </CollapsibleSection>
        </>
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
      return <span className="text-xl">Post foi restaurado</span>;

    default:
      return null;
  }
}