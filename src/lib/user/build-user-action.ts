// lib/user/build-user-actions.ts

import { blockUserAdminAction } from "@/app/actions/admin/user/block-user-admin-action";
import { restoreUserAdminAction } from "@/app/actions/admin/user/restore-user-admin-action";
import { unblockUserAdminAction } from "@/app/actions/admin/user/unblock-user-admin-action";
import { updateUserAdminAction } from "@/app/actions/admin/user/update-user-admin-action";
import { UserFormData, UserFieldDiff } from "./user-form-diff";
import { archiveUserAdminAction } from "@/app/actions/admin/user/archive-user-admin-action";

export type ActionResult = {
  success: boolean;
  errors: string[];
};

export type PendingAction = {
  key: string;
  label: string;
  requiresReason: boolean;
  run: (reason: string) => Promise<ActionResult>;
};

export function buildUserActions(
  userId: string,
  current: UserFormData,
  changed: UserFieldDiff,
  password?: string,
): PendingAction[] {
  const actions: PendingAction[] = [];

  if (changed.name || changed.email) {
    actions.push({
      key: "updateUser",
      label: "Atualizar nome/email",
      requiresReason: false,
      run: () =>
        updateUserAdminAction(userId, {
          name: current.name,
          email: current.email,
        }),
    });
  }

  if (changed.role) {
    actions.push({
      key: "updateRole",
      label:
        current.role === "admin" ? "Promover a admin" : "Rebaixar a usuário",
      requiresReason: true,
      run: (reason) =>
        updateRoleAdminAction(userId, {
          role: current.role,
          password: password!,
          reason,
        }),
    });
  }

  if (changed.isBlocked) {
    actions.push({
      key: current.isBlocked ? "blockUser" : "unblockUser",
      label: current.isBlocked ? "Bloquear usuário" : "Desbloquear usuário",
      requiresReason: true,
      run: (reason) =>
        current.isBlocked
          ? blockUserAdminAction(userId, { password: password!, reason })
          : unblockUserAdminAction(userId, { password: password!, reason }),
    });
  }

  if (changed.forceLogout && current.forceLogout) {
    actions.push({
      key: "forceLogout",
      label: "Forçar logout",
      requiresReason: true,
      run: (reason) =>
        forceLogoutAdminAction(userId, { password: password!, reason }),
    });
  }

  if (changed.deletedAt) {
    actions.push({
      key: current.deletedAt ? "softDeleteUser" : "restoreUser",
      label: current.deletedAt ? "Excluir usuário" : "Restaurar usuário",
      requiresReason: true,
      run: (reason) =>
        current.deletedAt
          ? archiveUserAdminAction(userId, { password: password!, reason })
          : restoreUserAdminAction(userId, { password: password!, reason }),
    });
  }

  return actions;
}
