import { z } from "zod";
import { Roles } from "./roles";

const CreateUserBase = z.object({
  name: z.string().trim().min(4, "Nome precisa ter um mínimo de 4 caracteres"),
  email: z.string().trim().email({ message: "E-mail inválido" }),
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
    newPassword2: z
      .string()
      .trim()
      .min(6, "Confirmação de senha precisa ter um mínimo de 6 caracteres"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.newPassword2;
    },
    {
      path: ["newPassword2"],
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
}).extend({});

export const UserFormStateSchema = CreateUserBase.pick({
  name: true,
  email: true,
});

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  forceLogout: z.boolean(),
  isBlocked: z.boolean(),
  role: z.enum(Roles),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const UserSummarySchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  email: z.string().default(""),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UserSummaryDto = z.infer<typeof UserSummarySchema>;
export type UserFormStateDto = z.infer<typeof UserFormStateSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
export type UserResponseDto = z.infer<typeof UserResponseSchema>;
