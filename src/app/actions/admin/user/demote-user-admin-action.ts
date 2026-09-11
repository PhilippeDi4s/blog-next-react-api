"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import {
  AdminReasonFormStateDto,
  AdminReasonFormStateSchema,
} from "@/lib/sharedSchemas/schemas";
import { AdminUpdateUserRoleSchema } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { redirect } from "next/navigation";

type DemoteUserAdminActionState = {
  formState: AdminReasonFormStateDto;
  errors: string[];
};

export async function demoteUserAdminAction(
  userId: string,
  formData: FormData,
  prevState: DemoteUserAdminActionState,
): Promise<DemoteUserAdminActionState> {
  const validation = await validateActionRequest(formData);

  if (!validation.success) {
    return {
      formState: prevState.formState,
      errors: validation.errors,
    };
  }
  const { token } = validation;

  const parsedData = parseFormData(
    formData,
    AdminUpdateUserRoleSchema,
    AdminReasonFormStateSchema,
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.errors,
      formState: parsedData.formState,
    };
  }

  const promotedUserData = parsedData.data;

  const res = await authenticatedApiRequest(
    `admin/users/${userId}/demote`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify(promotedUserData),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.success) {
    return {
      errors: res.errors,
      formState: parsedData.formState,
    };
  }

  redirect(`admin/users/${userId}`);
}
