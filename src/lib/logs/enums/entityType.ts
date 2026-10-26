import {
  FileTextIcon,
  ImageIcon,
  LayersIcon,
  UploadIcon,
  UserIcon,
} from "lucide-react";

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

const entityTypeIcons = {
  [EntityType.USER]: UserIcon,
  [EntityType.POST]: FileTextIcon,
  [EntityType.IMAGE]: ImageIcon,
  [EntityType.UPLOAD]: UploadIcon,
};

export const entityTypeOptions = [
  { value: "", label: "Todos os tipos", icon: LayersIcon },
  ...Object.values(EntityType).map((entityType) => ({
    value: entityType,
    label: ENTITY_TYPE_LABELS[entityType],
    icon: entityTypeIcons[entityType],
  })),
];
