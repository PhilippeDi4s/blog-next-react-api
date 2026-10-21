import { setUserBlockStatusAdminAction } from "@/app/actions/admin/user/set-user-block-status-admin-action";
import { setUserArchiveStatusAdminAction } from "@/app/actions/admin/user/set-user-archive-status-admin-action";
import { updateUserAdminAction } from "@/app/actions/admin/user/update-user-admin-action";
import { updateRoleAdminAction } from "@/app/actions/admin/user/update-role-user-admin-action";
import { forceLogoutUserAdminAction } from "@/app/actions/admin/login/force-logout-user-admin-action";
import { Roles } from "./enums/roles";
import { AdminUserFormValuesDto } from "./schemas";
import { FieldDiff } from "../shared/getFormDiff";
import { PendingAction } from "../shared/adminAction";

export function buildUserActions(
  userId: string,
  formPayload: AdminUserFormValuesDto,
  changed: FieldDiff<AdminUserFormValuesDto>,
  password: string,
): PendingAction[] {
  const actions: PendingAction[] = [];

  if (changed.name || changed.email) {
    actions.push({
      key: "updateUser",
      label: "Atualizar nome/email",
      needsPassword: true,
      run: (reason) =>
        updateUserAdminAction(userId, {
          name: formPayload.name,
          email: formPayload.email,
          reason,
          password,
        }),
    });
  }

  if (changed.role) {
    actions.push({
      key: "updateRole",
      label:
        formPayload.role === Roles.ADMIN
          ? "Promover a admin"
          : "Rebaixar a usuário",
      needsPassword: true,
      run: (reason) =>
        updateRoleAdminAction(userId, {
          role: formPayload.role,
          reason,
          password,
        }),
    });
  }

  if (changed.isBlocked) {
    actions.push({
      key: formPayload.isBlocked ? "blockUser" : "unblockUser",
      label: formPayload.isBlocked ? "Bloquear usuário" : "Desbloquear usuário",
      needsPassword: true,
      run: (reason) =>
        setUserBlockStatusAdminAction(userId, formPayload.isBlocked, {
          password,
          reason,
        }),
    });
  }

  if (changed.isLogged) {
    actions.push({
      key: "forceLogout",
      label: "Forçar logout",
      needsPassword: true,
      run: (reason) =>
        forceLogoutUserAdminAction(userId, { password: password, reason }),
    });
  }

  if (changed.deletedAt) {
    actions.push({
      key: formPayload.deletedAt ? "softDeleteUser" : "restoreUser",
      label: formPayload.deletedAt ? "Arquivar usuário" : "Restaurar usuário",
      needsPassword: true,
      run: (reason) =>
        setUserArchiveStatusAdminAction(userId, Boolean(formPayload.deletedAt), {
          password,
          reason,
        }),
    });
  }

  return actions;
}
