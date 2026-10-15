"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import {
  AdminUpdateUserRoleDto,
  AdminUpdateUserRoleSchema,
} from "@/lib/user/schemas";
import { Roles } from "@/lib/user/enums/roles";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { ActionResult } from "@/lib/shared/adminAction";

export async function updateRoleAdminAction(
  userId: string,
  data: AdminUpdateUserRoleDto,
): Promise<ActionResult> {
  const validation = await validateActionRequest();
  if (!validation.success) return { success: false, errors: validation.errors };

  const normalizedData =
    typeof data === "object" && data !== null
      ? {
          ...data,
          role:
            "role" in data && data.role === Roles.ADMIN
              ? Roles.ADMIN
              : "role" in data && data.role === Roles.USER
                ? Roles.USER
                : "role" in data
                  ? data.role
                  : undefined,
        }
      : data;
  const parsed = AdminUpdateUserRoleSchema.safeParse(normalizedData);
  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  console.log(parsed.data);

  const endpoint = parsed.data.role === Roles.ADMIN ? "promote" : "demote";

  const payload = {
    reason: parsed.data.reason,
    password: parsed.data.password,
  };

  const res = await authenticatedApiRequest(
    `/admin/users/${userId}/${endpoint}`,
    validation.token,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.success) return { success: false, errors: res.errors };

  revalidateTag(`user-${userId}`, "max");
  return { success: true, errors: [] };
}
