import z from "zod";
import { UserSummarySchema } from "../user/schemas";

export const ImageResponseSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  url: z.url(),
  folder: z.string(),
  createdAt: z.string(),
  uploadedBy: UserSummarySchema,
  deletedAt: z.string().nullable(),
});

export const ImageSummarySchema = z.object({
  id: z.string().default(""),
  url: z.string().default(""),
  uploadedBy: UserSummarySchema,
});

export const AdminImageSearchSchema = z.object({
  id: z.string().optional(),
  url: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  userEmail: z.string().optional(),
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

export type ImageResponseDto = z.infer<typeof ImageResponseSchema>;
export type AdminImageSearchDto = z.infer<typeof AdminImageSearchSchema>;
