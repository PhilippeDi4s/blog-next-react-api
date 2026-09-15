export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

const roleLabels: Record<Roles, string> = {
  [Roles.ADMIN]: "Administrador",
  [Roles.USER]: "Usuário",
};

export const roleOptions = Object.values(Roles).map((role) => ({
  value: role,
  label: roleLabels[role],
}));
