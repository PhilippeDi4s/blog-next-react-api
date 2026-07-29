import "server-only";
import { getLoginSession } from "@/lib/login/manage-login";
import { ApiRequest, apiRequest } from "./api-request";

export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const jwtToken = await getLoginSession();

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
