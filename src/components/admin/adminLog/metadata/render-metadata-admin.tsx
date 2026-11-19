import { EntityType } from "@/lib/logs/enums/entityType";
import { ActivityLog } from "@/lib/logs/types/log-types";
import { ImageMetadata } from "./ImageMetadata";
import { PostMetadata } from "./PostMetadata";
import { UserMetadata } from "./UserMetadata";

export function renderMetadataAdmin(log: ActivityLog) {
  switch (log.entityType) {
    case EntityType.USER:
      return <UserMetadata log={log} />;

    case EntityType.POST:
      return <PostMetadata log={log} />;

    case EntityType.IMAGE:
    case EntityType.UPLOAD:
      return <ImageMetadata log={log} />;

    default:
      return null;
  }
}