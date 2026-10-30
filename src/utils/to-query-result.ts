import { QueryResult } from "@/lib/shared/types/query";
import { ApiRequest } from "@/utils/api-request";

export function toQueryResult<T>(result: ApiRequest<T>): QueryResult<T> {
  if (!result.success) return result;
  return { success: true, data: result.data, errors: [] };
}
