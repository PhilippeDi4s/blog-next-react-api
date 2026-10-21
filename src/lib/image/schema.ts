import { z } from "zod";
import { UserSummarySchema } from "../user/schemas";
import { emptyToUndefined } from "../sharedSchemas/schemas";

export const ImageResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  createdAt: z.string(),
  uploadedBy: UserSummarySchema,
});

export const ImageSummarySchema = z.object({
  id: z.string().default(""),
  url: z.string().default(""),
  uploadedBy: UserSummarySchema,
});

export const ImageSearchParamsSchema = z.object({
  id: z.preprocess(emptyToUndefined, z.string().optional()),
  url: z.preprocess(emptyToUndefined, z.string().optional()),
  userId: z.preprocess(emptyToUndefined, z.string().optional()),
  userName: z.preprocess(emptyToUndefined, z.string().optional()),
  userEmail: z.preprocess(emptyToUndefined, z.string().optional()),
  startDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
  endDate: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
  page: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).optional(),
  ),
  limit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).optional(),
  ),
});

export type ImageResponseDto = z.infer<typeof ImageResponseSchema>;
export type ImageSearchParamsDto = z.infer<typeof ImageSearchParamsSchema>;
