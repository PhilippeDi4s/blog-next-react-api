import { LockKeyholeIcon, UnlockKeyholeIcon, UsersIcon } from "lucide-react";

export enum BlockedFilter {
  NOT_BLOCKED = "false",
  INCLUDE_ALL = "all",
  BLOCKED_ONLY = "true",
}

export const BLOCKED_FILTERS_LABEL: Record<BlockedFilter, string> = {
  [BlockedFilter.NOT_BLOCKED]: "Não bloqueados",
  [BlockedFilter.INCLUDE_ALL]: "Todos",
  [BlockedFilter.BLOCKED_ONLY]: "Bloqueados",
};

export const blockedFilterOptions = Object.values(BlockedFilter).map(
  (isBlocked) => ({
    value: isBlocked,
    label: BLOCKED_FILTERS_LABEL[isBlocked],
    icon:
      isBlocked === BlockedFilter.BLOCKED_ONLY
        ? LockKeyholeIcon
        : isBlocked === BlockedFilter.NOT_BLOCKED
          ? UnlockKeyholeIcon
          : UsersIcon,
  }),
);

export function blockedFilterFromBoolean(value?: boolean): BlockedFilter {
  if (value === undefined) return BlockedFilter.INCLUDE_ALL;
  return value ? BlockedFilter.BLOCKED_ONLY : BlockedFilter.NOT_BLOCKED;
}
