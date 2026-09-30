import { FieldError } from "@/lib/shared/adminAction";

type ApiRequestError = {
  errors: FieldError[];
  success: false;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  setCookie?: string;
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

    const body = await res.json();

    if (!res.ok) {
      const errors: FieldError[] = Array.isArray(body?.errors)
        ? body.errors
        : [
            {
              code: "REQUEST_ERROR",
              message: body.message ?? "Erro inesperado",
            },
          ];

      return {
        errors,
        success: false,
      };
    }

    return {
      success: true,
      data: body,
      setCookie: res.headers.get("set-cookie") ?? undefined,
    };
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

// TODO: Fazer com que o cookie criaod pelo nest seja enviado diretamente parqa o browser. é necessário criar um novo arequivo que ça um outro fecth, porem de formato diferente desse
