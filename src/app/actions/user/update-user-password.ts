import { getLoginSession } from "@/lib/auth/session";
import {
    UpdatePasswordSchema,
} from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { redirect } from "next/navigation";

type UpdateUserActionState = {
  errors: string[];
  success?: string;
};

export async function UpdateUserPasswordAction(
  prevState: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const jwt = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePasswordSchema.safeParse(formDataToObj);

  if (!jwt) {
    return {
      errors: ["Login expirado", "Faça login em outra aba antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
    };
  }

  const updatedUserPasswordData = zodParsedObj.data;

  const res = await authenticatedApiRequest("user/me/password", jwt, {
    method: "PATCH",
    body: JSON.stringify(updatedUserPasswordData),
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  if (!res.success) {
    return {
      errors: res.errors,
    };
  }

  redirect("login/userChanged");
}
