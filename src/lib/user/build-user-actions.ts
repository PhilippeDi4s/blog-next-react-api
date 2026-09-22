import { blockUserAdminAction } from "@/app/actions/admin/user/block-user-admin-action";
import { restoreUserAdminAction } from "@/app/actions/admin/user/restore-user-admin-action";
import { unblockUserAdminAction } from "@/app/actions/admin/user/unblock-user-admin-action";
import { updateUserAdminAction } from "@/app/actions/admin/user/update-user-admin-action";
import { updateRoleAdminAction } from "@/app/actions/admin/user/update-role-user-admin-action";
import { forceLogoutUserAdminAction } from "@/app/actions/admin/login/force-logout-user-admin-action";
import { archiveUserAdminAction } from "@/app/actions/admin/user/archive-user-admin-action";
import { Roles } from "./roles";
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
        formPayload.isBlocked
          ? blockUserAdminAction(userId, { password: password, reason })
          : unblockUserAdminAction(userId, { password: password, reason }),
    });
  }

  if (changed.forceLogout && formPayload.forceLogout) {
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
        formPayload.deletedAt
          ? archiveUserAdminAction(userId, { password, reason })
          : restoreUserAdminAction(userId, { password, reason }),
    });
  }

  return actions;
}
