import { Notice } from "../notifications";
import { useAdminForm } from "../shared/useAdminForm";
import { buildPostAction } from "./build-post-action";
import { AdminPostFormValuesDto, PostResponseDto } from "./schemas";

export function usePostAdminForm(
  postId: string,
  original: AdminPostFormValuesDto,
  fallbackSlug: string,
) {
  return useAdminForm(postId, original, {
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

      return `/blog/${updatedPost?.slug ?? fallbackSlug}`;
    },
  });
}
