import { isUrlOrRelativePath } from "@/utils/is-url-or-relative-path";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { UserSummarySchema } from "../user/schemas";
import {
  AdminReasonSchema,
  booleanFilter,
  emptyToUndefined,
} from "../sharedSchemas/schemas";
import { PublishedFilter } from "./enums/publishedFilter";
import { withDateRanges } from "../sharedSchemas/dateRange";

const ALLOWED_IMAGE_HOST = "res.cloudinary.com";

const postSearchDateFilter = z.preprocess(
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

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Título deve ter, no mínimo, 10 caracteres")
    .max(120, "Título deve ter um máximo de 120 caracteres"),
  content: z
    .string()
    .trim()
    .min(10, "Conteúdo é obrigatório")
    .transform((val) => sanitizeHtml(val)),
  excerpt: z
    .string()
    .trim()
    .min(10, "Excerto precisa de um mínimo de 10 caracteres")
    .max(200, "Excerto não deve ter mais que 200 caracteres"),
  coverImage: z
    .string()
    .trim()
    .refine(isUrlOrRelativePath, {
      message: "URL da capa deve ser uma URL ou caminho para imagem",
    })
    .refine(
      (val) => {
        if (!val.startsWith("http")) return true;
        try {
          const url = new URL(val);
          return url.hostname === ALLOWED_IMAGE_HOST;
        } catch {
          return false;
        }
      },
      { message: "A imagem de capa deve ser enviada através do upload" },
    ),
  published: z
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
    .transform((val) => val === "on" || val === "true" || val === true),
});

export const CreatePostSchema = PostBaseSchema;
export const UpdatePostSchema = PostBaseSchema;

export const PostFormStateSchema = PostBaseSchema.extend({
  title: z.string().default(""),
  excerpt: z.string().default(""),
  author: UserSummarySchema.optional().default({
    id: "",
    email: "",
    name: "",
  }),
  content: z.string().default(""),
  coverImage: z.string().default(""),
  createdAt: z.string().default(""),
});

export const PostResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  published: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  coverImage: z.object({
    id: z.string(),
    uploadedBy: z.string().nullable(),
    url: z.string().nullable(),
  }),
  author: UserSummarySchema,
  deletedAt: z.string().nullable(),
});

export const AdminUpdatePostSchema = AdminReasonSchema.extend(
  UpdatePostSchema.shape,
);
export const AdminPostFormValuesSchema = UpdatePostSchema.extend({
  deletedAt: z.string().nullable(),
});

export function toAdminPostFormValues(
  post: PostResponseDto,
): AdminPostFormValuesDto {
  return {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage?.url ?? "",
    published: post.published,
    deletedAt: post.deletedAt,
  };
}

export const PostSearchParamsSchema = withDateRanges(z.object({
  id: z.preprocess(emptyToUndefined, z.string().optional()),
  title: z.preprocess(emptyToUndefined, z.string().optional()),
  slug: z.preprocess(emptyToUndefined, z.string().optional()),
  authorId: z.preprocess(emptyToUndefined, z.string().optional()),
  authorName: z.preprocess(emptyToUndefined, z.string().optional()),
  authorEmail: z.preprocess(emptyToUndefined, z.string().optional()),
  published: booleanFilter(PublishedFilter.INCLUDE_ALL),
  startDate: postSearchDateFilter,
  endDate: postSearchDateFilter,
  page: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).optional(),
  ),
  limit: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1).optional(),
  ),
}),  [
    { start: "startDate", end: "endDate" },
  ],);

export type PostFormValuesDto = z.infer<typeof PostBaseSchema>;

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;

export type PostFormStateDto = z.infer<typeof PostFormStateSchema>;

export type PostResponseDto = z.infer<typeof PostResponseSchema>;

export type AdminUpdatePostDto = z.infer<typeof AdminUpdatePostSchema>;
export type AdminPostFormValuesDto = z.infer<typeof AdminPostFormValuesSchema>;
export type PostSearchParamsDto = z.infer<typeof PostSearchParamsSchema>;
