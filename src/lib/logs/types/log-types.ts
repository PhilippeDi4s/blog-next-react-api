import { ActionType } from "@/lib/logs/enums/actionType";
import type { EntityType } from "@/lib/logs/enums/entityType";
import { UserSummaryDto } from "@/lib/user/schemas";

type Snapshot = Record<string, unknown>;
type RoleSnapshot = { role: string };

// Espelha o back: Base/Create/Update/DeleteLogMetadata<T>
type BaseLogMetadata = { isAdminAction: boolean };
type CreateLogMetadata<T> = BaseLogMetadata & { created: T };
type UpdateLogMetadata<T> = BaseLogMetadata & { before: T; after: T };
type DeleteLogMetadata<T> = BaseLogMetadata & { deleted: T };

// Espelha o LogMetadataMap do back, uma linha por action
type LogMetadataMap = {
  [ActionType.CREATED]: CreateLogMetadata<Snapshot>;
  [ActionType.UPDATED]: UpdateLogMetadata<Snapshot>;
  [ActionType.DELETED]: DeleteLogMetadata<Snapshot>;
  [ActionType.PROMOTE]: UpdateLogMetadata<RoleSnapshot>;
  [ActionType.DEMOTE]: UpdateLogMetadata<RoleSnapshot>;
  [ActionType.RESTORED]: BaseLogMetadata & { deletedAt: string | null };
  [ActionType.LOGIN]: BaseLogMetadata;
  [ActionType.LOGOUT]: BaseLogMetadata;
  [ActionType.PASSWORD_CHANGE]: BaseLogMetadata;
  [ActionType.PASSWORD_RESET]: BaseLogMetadata;
  [ActionType.BLOCK_USER]: BaseLogMetadata;
  [ActionType.UNBLOCK_USER]: BaseLogMetadata;
  [ActionType.REVOKE_FORCE_LOGOUT]: BaseLogMetadata;
};

type ActivityLogBase = {
  id: string;
  actor: UserSummaryDto;
  affectedUser?: UserSummaryDto;
  entityType: EntityType;
  entityId: string;
  reason: string | null;
  createdAt: string;
};

export type ActivityLog = {
  [A in ActionType]: ActivityLogBase & {
    action: A;
    metadata: LogMetadataMap[A];
  };
}[ActionType];
