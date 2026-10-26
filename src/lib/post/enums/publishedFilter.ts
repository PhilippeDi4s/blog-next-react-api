import { FileTextIcon, FilesIcon, SendIcon } from "lucide-react";

export enum PublishedFilter {
  DRAFT = "false",
  INCLUDE_ALL = "all",
  PUBLISHED = "true",
}

export const PUBLISHED_FILTER_LABELS: Record<PublishedFilter, string> = {
  [PublishedFilter.DRAFT]: "Rascunhos",
  [PublishedFilter.INCLUDE_ALL]: "Todos",
  [PublishedFilter.PUBLISHED]: "Publicados",
};

export const publishedFilterOptions = Object.values(PublishedFilter).map(
  (published) => ({
    value: published,
    label: PUBLISHED_FILTER_LABELS[published],
    icon:
      published === PublishedFilter.PUBLISHED
        ? SendIcon
        : published === PublishedFilter.DRAFT
          ? FileTextIcon
          : FilesIcon,
  }),
);

export function publishedFilterFromBoolean(
  value?: boolean,
): PublishedFilter {
  if (value === undefined) return PublishedFilter.INCLUDE_ALL;
  return value ? PublishedFilter.PUBLISHED : PublishedFilter.DRAFT;
}
