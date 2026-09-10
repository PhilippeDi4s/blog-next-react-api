"use server";

import {
  CreateUserSchema,
  UserFormStateDto,
  UserFormStateSchema,
  UserSummarySchema,
} from "@/lib/user/schemas";
import { apiRequest } from "@/utils/api-request";
import { simulateDelay } from "@/utils/async-delay";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { redirect } from "next/navigation";

type CreateUserActionState = {
  formState: UserFormStateDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  await simulateDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      formState: state.formState,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      formState: UserSummarySchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error),
      success: false,
    };
  }

  const res = await apiRequest<UserFormStateDto>("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!res.success) {
    return {
      formState: UserFormStateSchema.parse(formObj),
      errors: res.errors,
      success: res.success,
    };
  }

  redirect("/login?created=1");
}
