import {
  ActivityIcon,
  ArchiveIcon,
  ArchiveRestoreIcon,
  CirclePlusIcon,
  KeyRoundIcon,
  LockKeyholeIcon,
  LogInIcon,
  LogOutIcon,
  PencilIcon,
  ShieldIcon,
  UnlockKeyholeIcon,
  type LucideIcon,
} from "lucide-react";

export enum ActionType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  RESTORED = "RESTORED",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REVOKE_FORCE_LOGOUT = "REVOKE_FORCE_LOGOUT",
  PASSWORD_RESET = "PASSWORD_RESET",
  PASSWORD_CHANGE = "PASSWORD_CHANGE",
  PROMOTE = "PROMOTE",
  DEMOTE = "DEMOTE",
  BLOCK_USER = "BLOCK_USER",
  UNBLOCK_USER = "UNBLOCK_USER",
}

export const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  [ActionType.CREATED]: "Criado",
  [ActionType.UPDATED]: "Atualizado",
  [ActionType.DELETED]: "Excluído",
  [ActionType.RESTORED]: "Restaurado",
  [ActionType.LOGIN]: "Login",
  [ActionType.LOGOUT]: "Logout",
  [ActionType.REVOKE_FORCE_LOGOUT]: "Logout forçado",
  [ActionType.PASSWORD_RESET]: "Senha redefinida",
  [ActionType.PASSWORD_CHANGE]: "Senha alterada",
  [ActionType.PROMOTE]: "Promovido a administrador",
  [ActionType.DEMOTE]: "Rebaixado a usuário",
  [ActionType.BLOCK_USER]: "Usuário bloqueado",
  [ActionType.UNBLOCK_USER]: "Usuário desbloqueado",
};

const actionTypeIcons = {
  [ActionType.CREATED]: CirclePlusIcon,
  [ActionType.UPDATED]: PencilIcon,
  [ActionType.DELETED]: ArchiveIcon,
  [ActionType.RESTORED]: ArchiveRestoreIcon,
  [ActionType.LOGIN]: LogInIcon,
  [ActionType.LOGOUT]: LogOutIcon,
  [ActionType.REVOKE_FORCE_LOGOUT]: LogOutIcon,
  [ActionType.PASSWORD_RESET]: KeyRoundIcon,
  [ActionType.PASSWORD_CHANGE]: KeyRoundIcon,
  [ActionType.PROMOTE]: ShieldIcon,
  [ActionType.DEMOTE]: ShieldIcon,
  [ActionType.BLOCK_USER]: LockKeyholeIcon,
  [ActionType.UNBLOCK_USER]: UnlockKeyholeIcon,
} satisfies Record<ActionType, LucideIcon>;

export const actionTypeOptions = [
  { value: "", label: "Todas as ações", icon: ActivityIcon },
  ...Object.values(ActionType).map((action) => ({
    value: action,
    label: ACTION_TYPE_LABELS[action],
    icon: actionTypeIcons[action],
  })),
];
