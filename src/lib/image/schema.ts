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

export type ImageResponseDto = z.infer<typeof ImageResponseSchema>;
