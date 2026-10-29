import { noticeConfig, type NoticeKey } from "./notices";

export function isNoticeKey(value: string | null): value is NoticeKey {
  return value !== null && value in noticeConfig;
}
