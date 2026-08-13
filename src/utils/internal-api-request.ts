import { apiRequest } from "./api-request";

export async function internalApiRequest<T>(
  path: string,
  options: RequestInit = {},
) {
  return apiRequest<T>(path, {
    ...options,
    headers: {
      ...options.headers,
      "X-Internal-API-Key": process.env.INTERNAL_API_KEY!,
    },
  });
}
