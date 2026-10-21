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
