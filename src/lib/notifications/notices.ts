export const Notice = {
  USER_UPDATED: "user-updated",
  USER_DELETED: "user-deleted",
  USER_BLOCKED: "user-blocked",
  FORCE_LOGOUT: "force-logout",

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

  [Notice.FORCE_LOGOUT]: {
    message: "Faça login novamente.",
    type: "info",
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
