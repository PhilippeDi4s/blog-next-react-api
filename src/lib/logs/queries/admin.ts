import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { AdminLogSearchDto, LogResponseDto } from "../schema";

export async function findManyLogs(token: string, params?: AdminLogSearchDto) {
  const searchParams = new URLSearchParams();

  if (params?.action) {
    searchParams.set("action", params.action);
  }

  if (params?.userId) {
    searchParams.set("userId", params.userId);
  }

  if (params?.entityType) {
    searchParams.set("entityType", params.entityType);
  }

  if (params?.entityId) {
    searchParams.set("entityId", params.entityId);
  }
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

  const query = searchParams.toString();

  const res = await authenticatedApiRequest<LogResponseDto[]>(
    `admin/activity-logs${query ? `?${query}` : ""}`,
    token,
    {},
  );

  return res;
}
