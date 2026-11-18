import { ActionType } from "@/lib/logs/enums/actionType";
import { ActivityLog } from "@/lib/logs/types/log-types";
import { SnapshotMetadata } from "./SnapshotMetadata";
import { UpdateMetadata } from "./UpdateMetadata";

export function renderMetadataAdmin(log: ActivityLog) {
  switch (log.action) {
    case ActionType.UPDATED || ActionType.PROMOTE || ActionType.DEMOTE:
      return <UpdateMetadata log={log}/>

    default:
      return <SnapshotMetadata metadata={log} />;
  }
}
