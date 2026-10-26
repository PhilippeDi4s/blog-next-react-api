import { z } from "zod";
import { UserSummarySchema } from "../user/schemas";
import { emptyToUndefined } from "../sharedSchemas/schemas";

const imageSearchDateFilter = z.preprocess(
  (value) => {
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
  },
  z.coerce.date().optional(),
);

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
  startDate: imageSearchDateFilter,
  endDate: imageSearchDateFilter,
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
