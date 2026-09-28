"use server";

import { parseFormData } from "@/lib/forms/parse-form-data";
import { LoginSchema } from "@/lib/login/schema";
import { FormActionResult } from "@/lib/shared/adminAction";
import { LoginFormStateDto, LoginFormStateSchema } from "@/lib/user/schemas";
import { apiRequest } from "@/utils/api-request";
import { simulateDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState: FormActionResult<LoginFormStateDto>,
  formData: FormData,
): Promise<FormActionResult<LoginFormStateDto>> {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      success: false,
      errors: [{ code: "NOT_ALLOWED", message: "Login não permitido" }],
      formState: LoginFormStateSchema.parse(formData),
    };
  }

  
  await simulateDelay(5000);
  
  const parsed = parseFormData(formData, LoginSchema, LoginFormStateSchema);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.errors,
      formState: parsed.formState,
    };
  }

  const res = await apiRequest<{ accessToken: string }>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
  });

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
      formState: parsed.formState,
    };
  }

  redirect("/author/post");
}
