export enum BlockedFilter {
  NOT_BLOCKED = "false",
  INCLUDE_ALL = "",
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
  }),
);
