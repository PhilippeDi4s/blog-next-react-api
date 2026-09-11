"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import { Notice, redirectWithNotice } from "@/lib/notifications";
import {
  AdminReasonFormStateDto,
  AdminReasonFormStateSchema,
  ConfirmActionAdmin,
} from "@/lib/sharedSchemas/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

type RestoreUserAdminActionState = {
  formState: AdminReasonFormStateDto;
  errors: string[];
};

export async function restoreUserAdminAction(
  userId: string,
  formData: FormData,
  prevState: RestoreUserAdminActionState,
): Promise<RestoreUserAdminActionState> {
  const validation = await validateActionRequest(formData);

  if (!validation.success) {
    return {
      errors: validation.errors,
      formState: prevState.formState,
    };
  }
  const { token } = validation;

  const parsedData = parseFormData(
    formData,
    ConfirmActionAdmin,
    AdminReasonFormStateSchema,
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.errors,
      formState: parsedData.formState,
    };
  }

  const confirmAdminActionData = parsedData.data;

  const res = await authenticatedApiRequest(`admin/users/${userId}/restore`, token, {
    method: "PATCH",
    body: JSON.stringify(confirmAdminActionData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.success) {
    return {
      errors: res.errors,
      formState: parsedData.formState,
    };
  }

  redirectWithNotice(`admin/users/${userId}`, Notice.USER_RESTORED);
}
