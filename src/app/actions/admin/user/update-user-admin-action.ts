"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ActionResult } from "@/lib/shared/action-result";
import { AdminUpdateUserSchema } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { revalidateTag } from "next/cache";

export async function updateUserAdminAction(
  userId: string,
  data: unknown,
): Promise<ActionResult> {
  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = AdminUpdateUserSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const res = await authenticatedApiRequest(
    `admin/users/update/${userId}`,
    validation.token,
    {
      method: "PATCH",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.success) return { success: false, errors: res.errors };

  revalidateTag("users", "max");
  revalidateTag(`user-${userId}`, "max");
  return { success: true, errors: [] };
}
