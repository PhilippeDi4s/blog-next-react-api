"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { parseFormData } from "@/lib/forms/parse-form-data";
import {
  AdminUpdateUserSchema,
  UserFormStateDto,
  UserFormStateSchema,
} from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { redirect } from "next/navigation";

type UpdateUserAdminActionState = {
  formState: UserFormStateDto;
  errors: string[];
};

export async function updateUserAdminAction(
  userId: string,
  formData: FormData,
  prevState: UpdateUserAdminActionState,
): Promise<UpdateUserAdminActionState> {
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
    AdminUpdateUserSchema,
    UserFormStateSchema,
  );

  if (!parsedData.success) {
    return {
      errors: parsedData.errors,
      formState: parsedData.formState,
    };
  }

  const updatedUserData = parsedData.data;

  const res = await authenticatedApiRequest(
    `admin/users/update/${userId}`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify(updatedUserData),
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
