import { z } from "zod";
import { Roles } from "./roles";
import {
  ConfirmActionAdmin,
} from "../sharedSchemas/schemas";

export const RoleSchema = z.enum(Roles);

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
  forceLogout: z.boolean(),
  isBlocked: z.boolean(),
  role: RoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const AdminUpdateUserSchema = ConfirmActionAdmin.extend(
  UpdateUserSchema.shape,
);

export const AdminUpdateUserRoleSchema = z.object({
  reason: ConfirmActionAdmin.shape.reason,
  password: ConfirmActionAdmin.shape.password,
  role: RoleSchema,
});

export const AdminUserFormValuesSchema = UserResponseSchema.pick({
  name: true,
  email: true,
  role: true,
  isBlocked: true,
  forceLogout: true,
  deletedAt: true,
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

export type UserResponseDto = z.infer<typeof UserResponseSchema>;

export type AdminUpdateUserDto = z.infer<typeof AdminUpdateUserSchema>;
export type AdminUpdateUserRoleDto = z.infer<typeof AdminUpdateUserRoleSchema>;
export type AdminUserFormValuesDto = z.infer<typeof AdminUserFormValuesSchema>;
