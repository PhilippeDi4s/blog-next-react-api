"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ActionResult } from "@/lib/shared/types/action";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { updateTag } from "next/cache";
import { validateId } from "@/lib/shared/validation/validate-id";

export async function deleteImageAction(
  imageId: string,
): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const idErrors = validateId(imageId);
  if (idErrors) {
    return {
      success: false,
      errors: [{ code: "IMAGE_NOT_FOUND", message: "Imagem não encontrada" }],
    };
  }

  const res = await authenticatedApiRequest(
    `/images/${imageId}`,
    validation.token,
    { method: "DELETE" },
  );

  if (!res.success) {
    return { success: false, errors: res.errors };
  }

  updateTag("images");
  return { success: true, errors: [] };
}
