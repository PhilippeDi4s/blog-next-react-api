import { ShieldIcon, User2Icon} from "lucide-react";

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
    value: Roles.ADMIN,
    label: roleLabels[Roles.ADMIN],
    icon: ShieldIcon,
  },
  {
    value: Roles.USER,
    label: roleLabels[Roles.USER],
    icon: User2Icon,
  },
];
