import { redirect } from "next/navigation";

import type { NoticeKey } from "./notices";

export function redirectWithNotice(path: string, notice: NoticeKey): never {
  const separator = path.includes("?") ? "&" : "?";

  redirect(`${path}${separator}notice=${notice}`);
}
