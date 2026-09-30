import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { AdminUserSearchDto, UserResponseDto } from "../schemas";

export async function findManyUsers(
  token: string,
  params?: AdminUserSearchDto,
) {
  const searchParams = new URLSearchParams();

  if (params?.id) {
    searchParams.set("id", params.id);
  } else {
    if (params?.name) {
      searchParams.set("name", params.name);
    }

    if (params?.email) {
      searchParams.set("email", params.email);
    }

    if (params?.role) {
      searchParams.set("role", params.role);
    }

    if (params?.forceLogout !== undefined) {
      searchParams.set("forceLogout", String(params.forceLogout));
    }

    if (params?.isBlocked !== undefined) {
      searchParams.set("isBlocked", String(params.isBlocked));
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
  }

  const query = searchParams.toString();

  const res = await authenticatedApiRequest<UserResponseDto[]>(
    `admin/users${query ? `?${query}` : ""}`,
    token,
    {},
  );

  return res;
}
