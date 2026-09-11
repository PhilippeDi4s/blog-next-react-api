import { z } from "zod";

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
  reason: z.string().trim(),
});

export const ConfirmActionAdmin = z.object({
  reason: AdminReasonSchema,
  password: ConfirmPassworSchema,
})

export type AdminReasonFormStateDto = z.infer<
  typeof AdminReasonFormStateSchema
>;
