import { getLoginSession } from "./session";

type ActionValidationResult =
  | { success: true; token: string }
  | { success: false; errors: FieldError[] };

export async function validateActionRequest(): Promise<ActionValidationResult> {
  const token = await getLoginSession();

  if (!token) {
    return { success: false, errors: ["Login expirado", "Faça login novamente"] };
  }

  return { success: true, token };
}

// TODO: CORRIGIR ARQUIVOS QUE POSSUEM FieldError