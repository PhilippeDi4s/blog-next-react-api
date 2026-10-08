export const Notice = {
  USER_CREATED: "user-created",
  USER_UPDATED: "user-updated",
  USER_UPDATED_PASSWORD: "user-updated-password",
  USER_DELETED: "user-deleted",
  USER_ARCHIVED: "user-archived",
  USER_RESTORED: "user-stored",
  USER_BLOCKED: "user-blocked",
  USER_PROMOTE: "user-promote",
  USER_DEMOTE: "user-demote",
  USER_NOT_FOUND: "user-not-found",
  USER_LOGOUT: "user-logout",

  AUTH_LOGIN_REQUIRED: "auth-login-required",

  ADMIN_FORCE_LOGOUT: "admin-force-logout",
  ADMIN_BLOCKED: "admin-blocked",
  ADMIN_UNBLOCKED: "admin-unblocked",

  ADMIN_POST_UPDATE: "admin-post-updated",
  ADMIN_POST_ARCHIVE: "admin-post-archived",
  ADMIN_POST_RESTORE: "admin-post-restored",

  POST_CREATED: "post-created",
  POST_DELETED: "post-deleted",
  POST_UPDATED: "post-updated",
  POST_PUBLISHED: "post-published",
  POST_NOT_FOUND: "post-not-found",

  IMAGE_UPLOADED: "image-uploaded",
  IMAGE_DELETED: "image-deleted",
  IMAGE_NOT_FOUND: "image-not-found",
} as const;

export type NoticeKey = (typeof Notice)[keyof typeof Notice];

export type NoticeType = "success" | "error" | "info";

type NoticeConfig = {
  message: string;
  type: NoticeType;
};

export const noticeConfig: Record<NoticeKey, NoticeConfig> = {
  [Notice.USER_CREATED]: {
    message: "Usuário criado com sucesso.",
    type: "success",
  },

  [Notice.USER_UPDATED]: {
    message: "Usuário atualizado com sucesso.",
    type: "success",
  },

  [Notice.USER_UPDATED_PASSWORD]: {
    message: "Senha atualizada com sucesso.",
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

  [Notice.USER_LOGOUT]: {
    message: "Logout feito com sucesso",
    type: "success",
  },

  [Notice.USER_NOT_FOUND]: {
    message: "Usuário não encontrado",
    type: "error",
  },

  [Notice.AUTH_LOGIN_REQUIRED]: {
    message: "Você precisa estar logado para acessar esta página.",
    type: "error",
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

  [Notice.ADMIN_POST_UPDATE]: {
    message: "Post atualizado com sucesso",
    type: "success",
  },

  [Notice.ADMIN_POST_ARCHIVE]: {
    message: "Post arquivado com sucesso",
    type: "success",
  },

  [Notice.ADMIN_POST_RESTORE]: {
    message: "Post restaurado com sucesso",
    type: "success",
  },

  [Notice.POST_CREATED]: {
    message: "Post criado com sucesso.",
    type: "success",
  },

  [Notice.POST_DELETED]: {
    message: "Post deletado com sucesso.",
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

  [Notice.POST_NOT_FOUND]: {
    message: "Post não encontrado.",
    type: "error",
  },

  [Notice.IMAGE_UPLOADED]: {
    message: "Imagem enviada com sucesso.",
    type: "success",
  },

  [Notice.IMAGE_DELETED]: {
    message: "Imagem deletada com sucesso.",
    type: "success",
  },

  [Notice.IMAGE_NOT_FOUND]: {
    message: "Imagem não encontrada",
    type: "error",
  },
};
