"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { ConfirmActionAdmin } from "@/lib/sharedSchemas/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";

export async function restoreImageAdminAction(
  imageId: string,
  formData: FormData,
): Promise<ActionResult> {
  const idErrors = validateId(imageId);

  if (idErrors) {
    return {
      success: false,
      errors: idErrors,
    };
  }

  const validation = await validateActionRequest();

  if (!validation.success) return { success: false, errors: validation.errors };

  const parsed = ConfirmActionAdmin.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: getZodErrorMessages(parsed.error),
    };
  }

  const res = await authenticatedApiRequest(
    `admin/images/${imageId}/restore`,
    validation.token,
    {
      method: "PATCH",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }

  return {
    success: true,
    errors: [],
  };
}
