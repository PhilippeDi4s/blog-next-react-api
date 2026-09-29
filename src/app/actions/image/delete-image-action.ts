import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import { ActionResult } from "@/lib/shared/adminAction";
import { validateId } from "@/lib/shared/validate-id";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export async function deleteImageAction(
  imageId: string,
): Promise<ActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const idErrors = validateId(imageId);
  if (idErrors) {
    redirectWithNotice("author/images", Notice.IMAGE_NOT_FOUND);
  }

  const res = await authenticatedApiRequest(
    `/images/${imageId}`,
    validation.token,
    {
      method: "DELETE",
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
    };
  }
  redirectWithNotice("author/images", Notice.IMAGE_DELETED);
}
