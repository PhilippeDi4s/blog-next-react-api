import { ApiRequest, apiRequest } from "@/utils/api-request";
import "server-only";

export async function authenticatedApiRequest<T>(
  path: string,
  jwtToken: string | null,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  if (!jwtToken) {
    return {
      success: false,
      errors: ["Usuário não autenticado"],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
