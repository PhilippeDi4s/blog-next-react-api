"use client";

import { useActionState, useEffect, useState } from "react";
import { MarkdownEditor } from "../MarkdownEditor";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "../ImageUploader";
import { InputText } from "@/components/ui/InputText";
import { InputCheckbox } from "@/components/ui/InputCheckbox";
import { createPostAction } from "@/app/actions/create-post-action";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { showMessage } from "@/adapters";
import { updatePostAction } from "@/app/actions/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost: PublicPost;
};

type ManagePostFormInsertProps = {
  mode: "create";
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormInsertProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  let publicPost;

  if (mode === "update") {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      showMessage.dismiss();
      state.errors.forEach((error) => {
        showMessage.error(error);
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (created === "1") {
      showMessage.dismiss();
      showMessage.succsses("Post criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  useEffect(()=>{
    if(state.success){
      showMessage.succsses('Post atualizado com sucesso!')
    }
  }, [state.success])

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  return (
    <form action={action} className="mb-16 flex flex-col gap-6">
      <InputText
        labelText="ID"
        name="id"
        placeholder="ID gerado automaticamente"
        readOnly
        defaultValue={formState.id}
        disabled={isPending}
        type="text"
      />
      <InputText
        labelText="Slug"
        name="slug"
        placeholder="Slug gerado automaticamente"
        readOnly
        defaultValue={formState.slug}
        disabled={isPending}
        type="text"
      />

      <InputText
        labelText="Autor"
        name="author"
        placeholder="Digite o nome do autor"
        type="text"
        defaultValue={formState.author}
        disabled={isPending}
      />

      <InputText
        labelText="Título"
        name="title"
        placeholder="Digite o título"
        type="text"
        defaultValue={formState.title}
        disabled={isPending}
      />

      <InputText
        labelText="Exerto"
        name="excerpt"
        placeholder="Digite um resumo"
        type="text"
        defaultValue={formState.excerpt}
        disabled={isPending}
      />

      <ImageUploader disabled={isPending} />

      <InputText
        labelText="URL da imagem de capa"
        name="coverImageUrl"
        placeholder="Digite a URL da imagem"
        type="text"
        defaultValue={formState.coverImageUrl}
        disabled={isPending}
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
        placeholder="Digite a URL da imagem"
        type="checkbox"
        defaultChecked={formState.published}
        disabled={isPending}
      />

      <Button type="submit" className="mt-8" disabled={isPending}>
        {mode === "update" ? "Atualizar Post" : "Criar Post"}
      </Button>
    </form>
  );
}
