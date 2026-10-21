import { updatePostAdminAction } from "@/app/actions/admin/post/update-post-admin";
import { PendingAction } from "../shared/adminAction";
import { FieldDiff } from "../shared/getFormDiff";
import { AdminPostFormValuesDto } from "./schemas";
import { setPostArchiveStatusAdminAction } from "@/app/actions/admin/post/set-post-archive-status-admin-action";

export function buildPostAction(
  postId: string,
  formPayload: AdminPostFormValuesDto,
  changed: FieldDiff<AdminPostFormValuesDto>,
  password: string,
): PendingAction[] {
  const actions: PendingAction[] = [];

  if (
    changed.title ||
    changed.content ||
    changed.coverImage ||
    changed.published ||
    changed.excerpt
  ) {
    actions.push({
      key: "updatePost",
      label: "Atualizar post",
      needsPassword: false,
      run: (reason) =>
        updatePostAdminAction(postId, {
          title: formPayload.title,
          excerpt: formPayload.excerpt,
          content: formPayload.content,
          coverImage: formPayload.coverImage,
          published: formPayload.published,
          reason,
        }),
    });
  }

  if (changed.deletedAt) {
    actions.push({
      key: formPayload.deletedAt ? "softDeletePost" : "restorePost",
      label: formPayload.deletedAt ? "Arquivar post" : "Restaurar post",
      needsPassword: true,
      run: (reason) =>
        setPostArchiveStatusAdminAction(
          postId,
          Boolean(formPayload.deletedAt),
          { password, reason },
        ),
    });
  }
  return actions;
}
