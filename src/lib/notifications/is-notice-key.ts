import { noticeConfig, type NoticeKey } from "./notices";

export function isNoticeKey(
  value: string | undefined,
): value is NoticeKey {
  return value !== undefined && value in noticeConfig;
}