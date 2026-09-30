import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .trim()
    .min(3, "Senha precisa ter um mínimo de 3 caracteres"),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
});

export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
