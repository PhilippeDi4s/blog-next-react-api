import { Notice } from "../notifications";
import { useAdminForm } from "../shared/useAdminForm";
import { buildPostAction } from "./build-post-action";
import {  PostResponseDto } from "./schemas";

export function usePostAdminForm(
  original: PostResponseDto,
) {
  return useAdminForm(original.id, original, {
    buildActions: buildPostAction,
    notice: Notice.ADMIN_POST_UPDATE,
    formErrorMessage: "Não foi possível salvar as alterações do post.",
    getRedirectPath: ({ results, actions }) => {
      const idx = actions.findIndex((a) => a.key === "updatePost");
      const result = idx !== -1 ? results[idx] : undefined;

      const updatedPost =
        result?.status === "fulfilled" && result.value.success
          ? (result.value.data as PostResponseDto | undefined)
          : undefined;

      return `/admin/posts/${updatedPost?.id ?? original.id}`;
    },
  });
}
