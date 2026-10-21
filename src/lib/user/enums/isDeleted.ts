import { ArchiveIcon, User2Icon, UsersIcon } from "lucide-react";

export enum DeletedFilter {
  ACTIVE = "false",
  INCLUDE = "all",
  ONLY = "true",
}

export const DELETED_FILTER_LABELS: Record<DeletedFilter, string> = {
  [DeletedFilter.ACTIVE]: "Ativos",
  [DeletedFilter.INCLUDE]: "Todos",
  [DeletedFilter.ONLY]: "Excluídos",
};

export const deletedFilterOptions = Object.values(DeletedFilter).map(
  (status) => ({
    value: status,
    label: DELETED_FILTER_LABELS[status],
    icon:
      status === DeletedFilter.ONLY
        ? ArchiveIcon
        : status === DeletedFilter.ACTIVE
          ? User2Icon
          : UsersIcon,
  }),
);

export function deletedFilterFromBoolean(value?: boolean): DeletedFilter {
  if (value === undefined) return DeletedFilter.INCLUDE;
  return value ? DeletedFilter.ONLY : DeletedFilter.ACTIVE;
}
