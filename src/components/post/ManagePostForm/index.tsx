"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { createPostAction } from "@/app/actions/post/create-post-action";
import { updatePostAction } from "@/app/actions/post/update-post-action";
import { showMessage } from "@/lib/show-message";
import { PostFormStateDto, PostFormStateSchema } from "@/lib/post/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { PostFormFields } from "../PostFormFields";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost: PostFormStateDto;
  postId: string;
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

  const serverAction =
    mode === "update"
      ? updatePostAction.bind(null, props.postId)
      : createPostAction;

  const initialState = {
    success: false,
    formState: PostFormStateSchema.parse(publicPost || {}),
    errors: [],
  };

  const [state, formAction, isPending] = useActionState(
    serverAction,
    initialState,
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || "");
  const authorName =
    mode === "create" ? props.currentUserName : formState.author.name;

  useEffect(() => {
    if (!state.success) {
      showMessage.dismiss();
      state.errors.forEach((e) => {
        const message = Array.isArray(e.message)
          ? e.message.join(", ")
          : e.message;
        showMessage.error(message);
      });
    }
  }, [state]);

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
    <form action={formAction} className="mb-16 flex flex-col gap-6">
      <PostFormFields
        id={mode === "update" ? props.postId : undefined}
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
