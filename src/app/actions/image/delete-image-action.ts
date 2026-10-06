"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { updateTag } from "next/cache";

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