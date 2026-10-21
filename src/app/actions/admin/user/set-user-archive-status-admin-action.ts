"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ActionResult } from "@/lib/shared/adminAction";
import {
  ConfirmActionAdminDto,
  ConfirmActionAdminSchema,
} from "@/lib/sharedSchemas/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";

export async function setUserArchiveStatusAdminAction(
  userId: string,
  isArchived: boolean,
  data: ConfirmActionAdminDto,
): Promise<ActionResult> {
  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = ConfirmActionAdminSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const endpoint = isArchived ? "archive" : "restore";
  const res = await authenticatedApiRequest(
    `/admin/users/${userId}/${endpoint}`,
    validation.token,
    {
      method: isArchived ? "DELETE" : "PATCH",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.success) return { success: false, errors: res.errors };

  revalidateTag("users", "max");
  revalidateTag(`user-${userId}`, "max");
  return { success: true, errors: [] };
}
