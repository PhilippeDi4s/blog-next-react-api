import { showMessage as toastMessage } from "@/lib/show-message";

import { noticeConfig, type NoticeKey } from "./notices";

export function showNotice(key: NoticeKey) {
  const { message, type } = noticeConfig[key];

  toastMessage[type](message);
}