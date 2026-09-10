"use client";

import { useEffect } from "react";
import {
    isNoticeKey,
  showNotice,
  type NoticeKey,
} from "@/lib/notifications";

type NoticeHandlerProps = {
  notice?: NoticeKey;
};

export function NoticeHandler({
  notice,
}: NoticeHandlerProps) {
  useEffect(() => {
    if (notice && isNoticeKey(notice)) {
      showNotice(notice);
    }
  }, [notice]);

  return null;
}