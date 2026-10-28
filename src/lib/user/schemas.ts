import { z } from "zod";
import { Roles } from "./enums/roles";
import {
  booleanFilter,
  ConfirmActionAdminSchema,
  emptyToUndefined,
} from "../sharedSchemas/schemas";
import { SessionStatus } from "./enums/sessionStatus";
import { BlockedFilter } from "./enums/isBlocked";
import { DeletedFilter } from "./enums/isDeleted";

export const RoleSchema = z.enum(Roles, { error: "Papel de usuário inválido" });
export const SessionStatusSchema = z.enum(SessionStatus);

const userSearchDateFilter = z.preprocess((value) => {
  const emptyValue = emptyToUndefined(value);
  if (typeof emptyValue !== "string") return emptyValue;

  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(emptyValue);
  if (!match) return emptyValue;

  const [, day, month, year] = match;
  const isoDate = `${year}-${month}-${day}`;
  const parsedDate = new Date(`${isoDate}T00:00:00.000Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== isoDate
  ) {
    return emptyValue;
  }

  return isoDate;
}, z.coerce.date().optional());

const CreateUserBase = z.object({
  name: z.string().trim().min(4, "Nome precisa ter um mínimo de 4 caracteres"),
  email: z.email({ message: "E-mail inválido" }).trim(),
  password: z
    .string()
    .trim()
    .min(6, "Senha precisa ter um mínimo de 6 caracteres"),
  confirmPassword: z
    .string()
    .trim()
    .min(6, "Confirmação de senha precisa ter um mínimo de 6 caracteres"),
});

export const CreateUserSchema = CreateUserBase.refine(
  (data) => {
    return data.password === data.confirmPassword;
  },
  {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  },
).transform(({ email, name, password }) => {
  return {
    name,
    email,
    password,
  };
});

export const UserFormStateSchema = z.object({
  name: z.string().default(""),
  email: z.string().default(""),
});

export const LoginSchema = CreateUserBase.pick({
  email: true,
  password: true,
});
export const LoginFormStateSchema = UserFormStateSchema.pick({ email: true });

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(6, "Senha precisa ter um mínimo de 6 caracteres"),
    newPassword: z
      .string()
      .trim()
      .min(6, "Nova senha precisa ter um mínimo de 6 caracteres"),
    confirmNewPassword: z
      .string()
      .trim()
      .min(6, "Confirmação de senha precisa ter um mínimo de 6 caracteres"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmNewPassword;
    },
    {
      path: ["confirmNewPassword"],
      message: "As senhas não conferem",
    },
  )
  .transform(({ currentPassword, newPassword }) => {
    return {
      currentPassword,
      newPassword,
    };
  });

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  confirmPassword: true,
});

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  isLogged: z.boolean(),
  sessionExpiresAt: z.string().nullable(),
  sessionStatus: SessionStatusSchema,
  isBlocked: z.boolean(),
  role: RoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const AdminUpdateUserSchema = ConfirmActionAdminSchema.extend(
  UpdateUserSchema.shape,
);

export const AdminUpdateUserRoleSchema = z.object({
  reason: ConfirmActionAdminSchema.shape.reason,
  password: ConfirmActionAdminSchema.shape.password,
  role: RoleSchema,
});

export const AdminUserFormValuesSchema = UserResponseSchema.pick({
  name: true,
  email: true,
  role: true,
  isBlocked: true,
  isLogged: true,
  sessionExpiresAt: true,
  deletedAt: true,
});

export const AdminUserFormSchema = UpdateUserSchema.extend({
  role: RoleSchema,
  isBlocked: z.boolean({ error: "Valor inválido para o bloqueio do usuário" }),
  isLogged: z.boolean({ error: "Valor inválido para a sessão do usuário" }),
  deletedAt: z.iso
    .datetime({ offset: true, error: "Data de arquivamento inválida" })
    .nullable(),
});

export const UserSearchParamsSchema = z.object({
  id: z.preprocess(emptyToUndefined, z.string().optional()),
  name: z.preprocess(emptyToUndefined, z.string().optional()),
  email: z.preprocess(emptyToUndefined, z.string().optional()),
  role: z.preprocess(emptyToUndefined, z.enum(Roles).optional()),
  sessionStatus: z.preprocess(
    emptyToUndefined,
    z.enum(SessionStatus).optional(),
  ),
  isLogged: z.preprocess(emptyToUndefined, z.stringbool().optional()),
  isBlocked: booleanFilter(BlockedFilter.INCLUDE_ALL),
  isDeleted: booleanFilter(DeletedFilter.INCLUDE),
  startDate: userSearchDateFilter,
  endDate: userSearchDateFilter,
  sessionExpiresStartDate: userSearchDateFilter,
  sessionExpiresEndDate: userSearchDateFilter,
  page: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).optional(),
  ),
});

export const UserSummarySchema = UserResponseSchema.pick({
  id: true,
  name: true,
  email: true,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;

export type UserSummaryDto = z.infer<typeof UserSummarySchema>;
export type UserFormStateDto = z.infer<typeof UserFormStateSchema>;

export type LoginDto = z.infer<typeof LoginSchema>;
export type LoginFormStateDto = z.infer<typeof LoginFormStateSchema>;

export type UserResponseDto = z.infer<typeof UserResponseSchema>;

export type AdminUpdateUserDto = z.infer<typeof AdminUpdateUserSchema>;
export type AdminUpdateUserRoleDto = z.infer<typeof AdminUpdateUserRoleSchema>;
export type AdminUserFormValuesDto = z.infer<typeof AdminUserFormValuesSchema>;

export type AdminUserFormDto = z.infer<typeof AdminUserFormSchema>;

export type UserSearchParamsDto = z.infer<typeof UserSearchParamsSchema>;
