import z from "zod";
import { UserSummarySchema } from "../user/schemas";
import { ActionType, EntityType } from "./enums";

export const LogResponseSchema = z.object({
  id: z.string(),
  author: UserSummarySchema,
  action: z.enum(ActionType),
  entityType: z.enum(EntityType),
  entityId: z.string(),
  reason: z.string(),
  metadata: z.record(z.string(), z.unknown()).nullable(),
  createdAt: z.string(),
});

export const AdminLogSearchSchema = z.object({
  action: z.enum(ActionType).optional(),
  userId: z.string().optional(),
  entityType: z.enum(EntityType),
  entityId: z.string().optional(),
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

export type LogResponseDto = z.infer<typeof LogResponseSchema>;
export type AdminLogSearchDto = z.infer<typeof AdminLogSearchSchema>;
