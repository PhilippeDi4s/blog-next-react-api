import { getLoginSession } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
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
  });

  if (!res.success) {
    return {
      errors: res.errors,
    };
  }

  redirect("login?user-deleted=1");
}
