"use client";

import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

import { createPostAction } from "@/app/actions/post/create-post-action";
import { updatePostAction } from "@/app/actions/post/update-post-action";

import { showMessage } from "@/lib/show-message";

import { FormStatePostDto, FormStatePostSchema } from "@/lib/post/schemas";

import { useRouter, useSearchParams } from "next/navigation";
import { PostFormFields } from "../PostFormFields";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost: FormStatePostDto;
};

type ManagePostFormInsertProps = {
  mode: "create";
  currentUserName: string;
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormInsertProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const created = searchParams.get("created");
  const updated = searchParams.get("updated");

  const publicPost = mode === "update" ? props.publicPost : undefined;

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: FormStatePostSchema.parse(publicPost || {}),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  const { formState } = state;

  const [contentValue, setContentValue] = useState(publicPost?.content || "");

  const authorName =
    mode === "create" ? props.currentUserName : formState.author.name;

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
      showMessage.success("Post criado com sucesso");

      const url = new URL(window.location.href);

      url.searchParams.delete("created");

      router.replace(url.toString());
    }
  }, [created, router]);

  useEffect(() => {
    if (updated === "1") {
      showMessage.dismiss();
      showMessage.success("Post atualizado com sucesso!");

      const url = new URL(window.location.href);

      url.searchParams.delete("updated");

      router.replace(url.toString());
    }
  }, [updated, router]);

  return (
    <form action={action} className="mb-16 flex flex-col gap-6">
      <PostFormFields
        formState={formState}
        isPending={isPending}
        authorName={authorName}
        contentValue={contentValue}
        setContentValue={setContentValue}
      />

      <Button type="submit" className="mt-8" disabled={isPending}>
        {mode === "update" ? "Atualizar Post" : "Criar Post"}
      </Button>
    </form>
  );
}
