import { getLoginSession } from "@/lib/auth/session";
import { UpdatePasswordSchema } from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { redirect } from "next/navigation";

type UpdateUserActionState = {
  errors: string[];
  success?: string;
};

export async function DeleteUserAction(
): Promise<UpdateUserActionState> {
  const jwt = await getLoginSession();

  if (!jwt) {
    return {
      errors: ["Login expirado", "Faça login em outra aba antes de salvar."],
    };


  }

  const res = await authenticatedApiRequest("user/me", jwt, {
    method: "DELETE",
    headers: {
      "Content-Type": "aplication/json",
    },
  });

  if (!res.success) {
    return {
      errors: res.errors,
    };
  }

  redirect("login/userDeleted");
}
