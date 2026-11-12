import { emptyToUndefined } from "@/lib/sharedSchemas/confirmAdminAction";
import { withDateRanges } from "@/lib/sharedSchemas/dateRange";
import z from "zod";
import { ActionType } from "../enums/actionType";
import { EntityType } from "../enums/entityType";

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

export type LogSearchParamsDto = z.infer<typeof LogSearchParamsSchema>;
