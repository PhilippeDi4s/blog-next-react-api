export const Notice = {
  USER_UPDATED: "user-updated",
  USER_DELETED: "user-deleted",
  USER_ARCHIVED: "user-archived",
  USER_RESTORED: "user-stored",
  USER_BLOCKED: "user-blocked",
  USER_PROMOTE: "user-promote",
  USER_DEMOTE: "user-demote",

  FORCE_LOGOUT: "force-logout",

  ADMIN_FORCE_LOGOUT: "admin-force-logout",
  ADMIN_BLOCKED: "admin-blocked",
  ADMIN_UNBLOCKED: "admin-unblocked",

  POST_CREATED: "post-created",
  POST_UPDATED: "post-updated",
  POST_PUBLISHED: "post-published",

  IMAGE_UPLOADED: "image-uploaded",
} as const;

export type NoticeKey = (typeof Notice)[keyof typeof Notice];

export type NoticeType = "success" | "error" | "info";

type NoticeConfig = {
  message: string;
  type: NoticeType;
};

export const noticeConfig: Record<NoticeKey, NoticeConfig> = {
  [Notice.USER_UPDATED]: {
    message: "Usuário atualizado com sucesso.",
    type: "success",
  },

  [Notice.USER_DELETED]: {
    message: "Usuário removido com sucesso.",
    type: "success",
  },

  [Notice.USER_BLOCKED]: {
    message: "Usuário bloqueado.",
    type: "error",
  },

  [Notice.USER_ARCHIVED]: {
    message: "Usuário arquivado com sucesso.",
    type: "success",
  },

  [Notice.USER_RESTORED]: {
    message: "Usuário restaurado com sucesso",
    type: "success",
  },

  [Notice.USER_PROMOTE]: {
    message: "Usuário promovido com sucesso",
    type: "success",
  },

  [Notice.USER_DEMOTE]: {
    message: "Usuário rebaixado com sucesso",
    type: "success",
  },

  [Notice.FORCE_LOGOUT]: {
    message: "Faça login novamente.",
    type: "info",
  },

  [Notice.ADMIN_FORCE_LOGOUT]: {
    message: "Usuário deslogado com sucesso",
    type: "success",
  },

  [Notice.ADMIN_BLOCKED]: {
    message: "Usuário bloqueado com sucesso",
    type: "success",
  },

  [Notice.ADMIN_UNBLOCKED]: {
    message: "Usuário desbloqueado com sucesso",
    type: "success",
  },

  [Notice.POST_CREATED]: {
    message: "Post criado com sucesso.",
    type: "success",
  },

  [Notice.POST_UPDATED]: {
    message: "Post atualizado com sucesso.",
    type: "success",
  },

  [Notice.POST_PUBLISHED]: {
    message: "Post publicado com sucesso.",
    type: "success",
  },

  [Notice.IMAGE_UPLOADED]: {
    message: "Imagem enviada com sucesso.",
    type: "success",
  },
};
