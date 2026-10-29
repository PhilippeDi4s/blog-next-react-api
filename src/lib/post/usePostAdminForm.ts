import { useMemo } from "react";
import { Notice } from "../notifications";
import { useAdminForm } from "../shared/hooks/useAdminForm";
import { buildPostAction } from "./build-post-action";
import { PostResponseDto, toAdminPostFormValues, UpdatePostSchema } from "./schemas";

export function usePostAdminForm(post: PostResponseDto) {
  const initial = useMemo(() => toAdminPostFormValues(post), [post]);

  return useAdminForm(post.id, initial, {
    buildActions: buildPostAction,
    notice: Notice.ADMIN_POST_UPDATE,
    schema: UpdatePostSchema,
    formErrorMessage: "Não foi possível salvar as alterações do post.",
    getRedirectPath: ({ results, actions }) => {
      const idx = actions.findIndex((a) => a.key === "updatePost");
      const result = idx !== -1 ? results[idx] : undefined;

      const updatedPost =
        result?.status === "fulfilled" && result.value.success
          ? (result.value.data as PostResponseDto | undefined)
          : undefined;

      return `/admin/posts/${updatedPost?.id ?? post.id}`;
    },
  });
}
