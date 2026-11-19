import { ActionType } from "@/lib/logs/enums/actionType";
import type { EntityType } from "@/lib/logs/enums/entityType";
import { Roles } from "@/lib/user/enums/roles";
import { UserSummaryDto } from "@/lib/user/schemas";

type UserLog = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  deletedAt: string | null;
  isBlocked: string;
  role: string;
  updatedAt: string;
};

type Snapshot<T> = Record<string, T>;

type BaseLogMetadata = { isAdminAction: boolean };
type CreateLogMetadata<T> = BaseLogMetadata & { created: T };
type UpdateLogMetadata<T> = BaseLogMetadata & { before: T; after: T };
type DeleteLogMetadata<T> = BaseLogMetadata & { deleted: T };

type LogMetadataMap<T> = {
  [ActionType.CREATED]: CreateLogMetadata<Snapshot<T>>;
  [ActionType.UPDATED]: UpdateLogMetadata<Snapshot<T>>;
  [ActionType.DELETED]: DeleteLogMetadata<Snapshot<T>>;
  [ActionType.PROMOTE]: UpdateLogMetadata<UserLogSnapshot>;
  [ActionType.DEMOTE]: UpdateLogMetadata<UserLogSnapshot>;
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
  activityLogId: string;
  actor: UserLog;
  affectedUser?: UserLog;
  entityType: EntityType;
  entityId: string;
  reason: string | null;
  createdAt: string;
};

export type ActivityLog = {
  [A in ActionType]: ActivityLogBase & {
    action: A;
    metadata: LogMetadataMap<unknown>[A];
  };
}[ActionType];

export type PostLogSnapshot = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  published: boolean;
  updatedAt: string;
};

export type UserLogSnapshot = {
  name: string;
  email: string;
  role: Roles;
};

export type ImageLogSnapshot = {
  url: string;
  folder: string;
  createdAt: string;
  uploadedById: string | null;
};
