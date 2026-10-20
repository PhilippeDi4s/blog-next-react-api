export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

export const roleLabels: Record<Roles, string> = {
  [Roles.ADMIN]: "Admin",
  [Roles.USER]: "Usuário",
};

export const roleOptions = [
  {
    value: "",
    label: "Todos",
  },
  {
    value: Roles.ADMIN,
    label: roleLabels[Roles.ADMIN],
  },
  {
    value: Roles.USER,
    label: roleLabels[Roles.USER],
  },
];
