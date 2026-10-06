import "server-only";
import { FieldError } from "@/lib/shared/adminAction";

type ApiRequestError = {
  errors: FieldError[];
  success: false;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const apiUrl = process.env.API_URL || "http://localhost:3001";

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${apiUrl}${path}`;

  try {
    const res = await fetch(url, options);
    const body = await res.json().catch(() => null);

    if (!res.ok) {
      const errors: FieldError[] = Array.isArray(body?.errors)
        ? body.errors
        : [
            {
              code: "REQUEST_ERROR",
              message: body?.message ?? "Erro inesperado",
            },
          ];

      return { errors, success: false };
    }

    return { success: true, data: body as T };
  } catch (err) {
    console.log(err);

    return {
      errors: [
        {
          code: "500",
          message: "Não foi possível conectar-se ao servidor",
        },
      ],
      success: false,
    };
  }
}
