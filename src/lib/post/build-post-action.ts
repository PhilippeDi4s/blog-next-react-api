import { updatePostAdminAction } from "@/app/actions/admin/post/update-post-admin";
import { PendingAction } from "../shared/adminAction";
import { FieldDiff } from "../shared/getFormDiff";
import { AdminPostFormValuesDto } from "./schemas";
import { archivePostAdminAction } from "@/app/actions/admin/post/archive-post-admin";
import { restorePostAdminAction } from "@/app/actions/admin/post/restore-post-admin";

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
    changed.coverImageUrl ||
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
          coverImageUrl: formPayload.coverImageUrl,
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
        formPayload.deletedAt
          ? archivePostAdminAction(postId, { password, reason })
          : restorePostAdminAction(postId, {password, reason}),
    });
  }
  return actions;
}
