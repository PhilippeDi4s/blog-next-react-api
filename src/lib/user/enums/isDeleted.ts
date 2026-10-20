export enum DeletedFilter {
  ACTIVE = "false",
  INCLUDE = "",
  ONLY = "true",
}

export const DELETED_FILTER_LABELS: Record<DeletedFilter, string> = {
  [DeletedFilter.ACTIVE]: "Somente ativos",
  [DeletedFilter.INCLUDE]: "Incluir excluídos",
  [DeletedFilter.ONLY]: "Somente excluídos",
};

export const deletedFilterOptions = Object.values(DeletedFilter).map(
  (status) => ({
    value: status,
    label: DELETED_FILTER_LABELS[status],
  }),
);