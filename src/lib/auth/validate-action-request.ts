import { getLoginSession } from "./session";

type ActionValidationResult =
  | { success: true; token: string }
  | { success: false; errors: string[] };

export async function validateActionRequest(
  formData: unknown
): Promise<ActionValidationResult> {
  if (!(formData instanceof FormData)) {
    return { success: false, errors: ["Dados inválidos"] };
  }

  const token = await getLoginSession();

  if (!token) {
    return { success: false, errors: ["Login expirado", "Faça login novamente"] };
  }

  return { success: true, token };
}