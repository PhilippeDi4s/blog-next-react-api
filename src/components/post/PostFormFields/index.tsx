import { InfoMessage } from "@/components/ui/InfoMessage";
import { InputCheckbox } from "@/components/ui/InputCheckbox";
import { InputText } from "@/components/ui/InputText";
import { LinkButton } from "@/components/ui/Link";
import { ImageUploader } from "@/components/user/ImageUploader";
import { MarkdownEditor } from "@/components/user/MarkdownEditor";
import { PostFormValuesDto } from "@/lib/post/schemas";
import { GalleryVerticalEndIcon } from "lucide-react";

type PostFormFieldsProps = {
  formState: PostFormValuesDto;
  isPending: boolean;
  authorName: string;
  contentValue: string;
  setContentValue: (v: string) => void;
  id?: string;
  slug?: string;
};

export function PostFormFields({
  formState,
  isPending,
  authorName,
  contentValue,
  setContentValue,
  id,
  slug,
}: PostFormFieldsProps) {
  return (
    <>
      {id !== undefined && (
        <InputText
          labelText="ID"
          name="id"
          readOnly
          disabled
          defaultValue={id}
          type="text"
        />
      )}
      {slug !== undefined && (
        <>
          <InfoMessage size="md">
            Slug atualizada automaticamente ao salvar, a partir do título
          </InfoMessage>
          <InputText
            labelText="Slug"
            readOnly
            disabled
            defaultValue={slug}
            type="text"
          />
        </>
      )}
      <InputText
        labelText="Autor"
        name="author"
        readOnly
        disabled
        defaultValue={authorName}
        type="text"
      />
      <InputText
        labelText="Título"
        name="title"
        defaultValue={formState.title}
        disabled={isPending}
        type="text"
      />
      <InputText
        labelText="Exerto"
        name="excerpt"
        defaultValue={formState.excerpt}
        disabled={isPending}
        type="text"
      />
      <ImageUploader
        disabled={isPending}
        actions={
          <LinkButton href="/imageGallery" variant="ghost">
            <GalleryVerticalEndIcon /> Galeria de imagens
          </LinkButton>
        }
      />
      <InputText
        labelText="URL da imagem de capa"
        name="coverImageUrl"
        defaultValue={formState.coverImageUrl}
        disabled={isPending}
        type="text"
      />
      <MarkdownEditor
        labelText="Conteúdo"
        value={contentValue}
        setValue={setContentValue}
        textAreaName="content"
        disabled={isPending}
      />
      <InputCheckbox
        labelText="Publicar?"
        name="published"
        defaultChecked={formState.published}
        disabled={isPending}
        type="checkbox"
      />
    </>
  );
}
