export enum EntityType {
  USER = "USER",
  POST = "POST",
  IMAGE = "IMAGE",
  UPLOAD = "UPLOAD",
}

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  [EntityType.USER]: "Usuário",
  [EntityType.POST]: "Post",
  [EntityType.IMAGE]: "Imagem",
  [EntityType.UPLOAD]: "Upload",
};
