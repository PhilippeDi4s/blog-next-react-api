import { Notice } from "../notifications";
import { useAdminForm } from "../shared/useAdminForm";
import { buildUserActions } from "./build-user-actions";
import { AdminUserFormSchema, AdminUserFormValuesDto } from "./schemas";

export function useUserAdminForm(
  userId: string,
  original: AdminUserFormValuesDto,
) {
  return useAdminForm(userId, original, {
    buildActions: buildUserActions,
    getRedirectPath: () => `/admin/users/${userId}`,
    schema: AdminUserFormSchema,
    notice: Notice.USER_UPDATED,
    formErrorMessage: "Não foi possível salvar as alterações do usuário.",
  });
}
