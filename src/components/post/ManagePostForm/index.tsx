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
    if (state.errors.length > 0) {
      showMessage.dismiss();

      state.errors.forEach((error) => {
        showMessage.error(error.message);
      });
    }
  }, [state.errors]);

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
