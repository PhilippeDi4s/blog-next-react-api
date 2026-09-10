import { getLoginSession } from "@/lib/auth/session";
import {
  UpdateUserSchema,
  UserFormStateDto,
  UserFormStateSchema,
} from "@/lib/user/schemas";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { redirect } from "next/navigation";

type UpdateUserActionState = {
  formState: UserFormStateDto;
  errors: string[];
  success?: string;
};

export async function UpdateUserAction(
  prevState: UpdateUserActionState,
  formData: FormData,
): Promise<UpdateUserActionState> {
  const jwt = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdateUserSchema.safeParse(formDataToObj);

  if (!jwt) {
    return {
      formState: UserFormStateSchema.parse(formDataToObj),
      errors: ["Login expirado", "Faça login em outra aba antes de salvar."],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);
    return {
      errors,
      formState: UserFormStateSchema.parse(formDataToObj),
    };
  }

  const updatedUserData = zodParsedObj.data;

  const res = await authenticatedApiRequest("user/me", jwt, {
    method: "PATCH",
    body: JSON.stringify(updatedUserData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.success) {
    return {
      formState: UserFormStateSchema.parse(updatedUserData),
      errors: res.errors,
    };
  }

  redirect("login?user-changed=1")

}
