import { showMessage } from "../show-message";
import { noticeConfig, type NoticeKey } from "./notices";

export function isNoticeKey(value: string | null): value is NoticeKey {
  return value !== null && value in noticeConfig;
}

export function showNotice(key: NoticeKey) {
  const { message, type } = noticeConfig[key];

  showMessage[type](message);
}
