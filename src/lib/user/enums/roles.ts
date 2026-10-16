export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

export const roleLabels: Record<Roles, string> = {
  [Roles.ADMIN]: "Admin",
  [Roles.USER]: "Usuário",
};

export const roleOptions = Object.values(Roles).map((role) => ({
  value: role,
  label: roleLabels[role],
}));
