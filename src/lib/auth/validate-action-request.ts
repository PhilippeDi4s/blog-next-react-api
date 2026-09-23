import { FieldError } from "../shared/adminAction";
import { getLoginSession } from "./session";

type ActionValidationResult =
  | { success: true; token: string }
  | { success: false; errors: FieldError[] };

export async function validateActionRequest(): Promise<ActionValidationResult> {
  const token = await getLoginSession();

  if (!token) {
    return {
      success: false,
      errors: [
        {
          code: "SESSION_EXPIRED",
          message: "Sua sessão expirou. Faça login novamente.",
        },
      ],
    };
  }

  return { success: true, token };
}
