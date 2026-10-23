import { z } from "zod";

export const emptyToUndefined = (value: unknown) =>
  value === "" ? undefined : value;

export const booleanFilter = (allValue: string) =>
  z.preprocess(
    (value) => (value === undefined || value === "" ? "all" : value),
    z
      .union([z.literal(allValue).transform(() => undefined), z.stringbool()])
      .optional(),
  );

export const AdminReasonSchema = z.object({
  reason: z
    .string()
    .min(10, "O motivo deve conter no mínimo 10 caracteres")
    .max(250, "O motivo deve conter no máximo 250 caracteres")
    .trim(),
});

export const AdminReasonFormStateSchema = z.object({
  reason: z.string().default(""),
});

export const ConfirmPassworSchema = z.object({
  password: z.string().min(1).trim(),
});

export const ConfirmActionAdminSchema = z.object({
  reason: AdminReasonSchema.shape.reason,
  password: ConfirmPassworSchema.shape.password,
});

export const idSchema = z.uuid("ID inválido");

export type AdminReasonFormStateDto = z.infer<
  typeof AdminReasonFormStateSchema
>;

export type ConfirmActionAdminDto = z.infer<typeof ConfirmActionAdminSchema>;
