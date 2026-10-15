import { z } from "zod";
import { Roles } from "./enums/roles";
import { ConfirmActionAdminSchema } from "../sharedSchemas/schemas";
import { SessionStatus } from "./enums/sessionStatus";

export const RoleSchema = z.enum(Roles);
export const SessionStatusSchema = z.enum(SessionStatus);

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

export const AdminUserSearchSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  role: z
    .enum(Roles, {
      error: "Cargo do usuário inválido.",
    })
    .optional(),
  sessionStatus: z
    .enum(SessionStatus, {
      error: "Status do usuário inválido.",
    })
    .optional(),
  isLogged: z
    .union(
      [
        z.literal("on"),
        z.literal("true"),
        z.literal("false"),
        z.literal(true),
        z.literal(false),
        z.literal(null),
        z.literal(undefined),
      ],
      {
        error: "Valor inválido para o filtro de encerramento de sessão.",
      },
    )
    .default(false)
    .transform((val) => val === "on" || val === "true" || val === true)
    .optional(),
  isBlocked: z
    .union([
      z.literal("on"),
      z.literal("true"),
      z.literal("false"),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform((val) => val === "on" || val === "true" || val === true)
    .optional(),
  sessionExpiresStartDate: z
    .date({
      error: "Data inicial inválida.",
    })
    .optional(),
  sessionExpiresEndDate: z
    .date({
      error: "Data final inválida.",
    })
    .optional(),
  startDate: z
    .date({
      error: "Data inicial inválida.",
    })
    .optional(),
  endDate: z
    .date({
      error: "Data final inválida.",
    })
    .optional(),
  page: z
    .int({
      error: "A página deve ser um número inteiro.",
    })
    .optional(),
  limit: z
    .int({
      error: "O limite deve ser um número inteiro.",
    })
    .optional(),
});

export const UserSummarySchema = UserResponseSchema.pick({
  id: true,
  name: true,
  email: true,
  sessionExpiresAt: true,
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
export type AdminUserSearchDto = z.infer<typeof AdminUserSearchSchema>;
