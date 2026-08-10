import { isUrlOrRelativePath } from "@/utils/is-url-or-relative-path";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { PublicUserSchema } from "../user/schemas";

const ALLOWED_IMAGE_HOST = "res.cloudinary.com";

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Título deve ter, no mínimo, 3 caracteres")
    .max(120, "Título deve ter um máximo de 120 caracteres"),
  content: z
    .string()
    .trim()
    .min(3, "Conteúdo é obrigatório")
    .transform((val) => sanitizeHtml(val)),
  excerpt: z
    .string()
    .trim()
    .min(3, "Excerto precisa de um mínimo de 3 caracteres")
    .max(200, "Excerto não deve ter mais que 200 caracteres"),
  coverImageUrl: z
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

export const PublicPostSchema = PostBaseSchema.extend({
  id: z.string().default(""),
  slug: z.string().default(""),
  title: z.string().default(""),
  excerpt: z.string().default(""),
  author: PublicUserSchema.optional().default({
    id: "",
    email: "",
    name: "",
  }),
  content: z.string().default(""),
  coverImageUrl: z.string().default(""),
  createdAt: z.string().default(""),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
export type PublicPostDto = z.infer<typeof PublicPostSchema>;
