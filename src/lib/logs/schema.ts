import { z } from "zod";
import { UserSummarySchema } from "../user/schemas";
import { ActionType } from "./enums/actionType";
import { EntityType } from "./enums/entityType";
import { emptyToUndefined } from "../sharedSchemas/schemas";
import { withDateRanges } from "../sharedSchemas/dateRange";

export const LogResponseSchema = z.object({
  activityLogId: z.string(),
  actor: UserSummarySchema,
  action: z.enum(ActionType),
  entityType: z.enum(EntityType),
  entityId: z.string(),
  affectedUser: UserSummarySchema.nullable(),
  reason: z.string().nullable(),
  metadata: z.record(z.string(), z.unknown()).nullable(),
  createdAt: z.string(),
});

export const LogSearchParamsSchema = withDateRanges(
  z.object({
    id: z.preprocess(emptyToUndefined, z.string().optional()),
    action: z.preprocess(emptyToUndefined, z.enum(ActionType).optional()),
    actorId: z.preprocess(emptyToUndefined, z.string().optional()),
    entityType: z.preprocess(emptyToUndefined, z.enum(EntityType).optional()),
    entityId: z.preprocess(emptyToUndefined, z.string().optional()),
    affectedUserId: z.preprocess(emptyToUndefined, z.string().optional()),
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
  }),
  [{ start: "startDate", end: "endDate" }],
);

export type LogResponseDto = z.infer<typeof LogResponseSchema>;
export type LogSearchParamsDto = z.infer<typeof LogSearchParamsSchema>;
