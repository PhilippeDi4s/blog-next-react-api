import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { PaginatedResponse } from "@/lib/shared/types/pagination";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { LogResponseDto, LogSearchParamsDto } from "../schema";
import { QueryResult } from "@/lib/shared/types/query";
import { toQueryResult } from "@/utils/to-query-result";

export async function findManyLogs(token: string, params?: LogSearchParamsDto): Promise<QueryResult<PaginatedResponse<LogResponseDto>>> {
  const searchParams = new URLSearchParams();
  if (params?.id) {
    searchParams.set("id", params.id);
  } else {
    if (params?.action) searchParams.set("action", params.action);
    if (params?.actorId) searchParams.set("actorId", params.actorId);
    if (params?.entityType) searchParams.set("entityType", params.entityType);
    if (params?.entityId) searchParams.set("entityId", params.entityId);
    if (params?.affectedUserId) searchParams.set("affectedUserId", params.affectedUserId);
    if (params?.startDate) {
      searchParams.set("startDate", params.startDate.toISOString());
    }
    if (params?.endDate) {
      searchParams.set("endDate", params.endDate.toISOString());
    }
    if (params?.page !== undefined) {
      searchParams.set("page", String(params.page));
    }
    if (params?.limit !== undefined) {
      searchParams.set("limit", String(params.limit));
    }
  }

  const query = searchParams.toString();
  const result = await authenticatedApiRequest<PaginatedResponse<LogResponseDto>>(
    `/admin/activity-logs${query ? `?${query}` : ""}`,
    token,
    {},
  );
  return toQueryResult(result);
}

export async function getLogs(params?: LogSearchParamsDto): Promise<QueryResult<PaginatedResponse<LogResponseDto>>> {
  const token = await getLoginSessionOrRedirect();
  return findManyLogs(token, params);
}
