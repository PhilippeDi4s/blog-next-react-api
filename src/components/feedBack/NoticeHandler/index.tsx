"use client";

import { isNoticeKey, showNotice } from "@/lib/notifications";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function NoticeHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const notice = searchParams.get("notice");

    if (!isNoticeKey(notice)) return;

    showNotice(notice);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("notice");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router]);

  return null;
}