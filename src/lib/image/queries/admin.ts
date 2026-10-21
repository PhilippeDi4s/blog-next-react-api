import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { PaginatedResponse } from "@/lib/shared/adminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { ImageResponseDto, ImageSearchParamsDto } from "../schema";

export async function findManyImages(
  token: string,
  params?: ImageSearchParamsDto,
) {
  const searchParams = new URLSearchParams();

  if (params?.id) {
    searchParams.set("id", params.id);
  } else {
    if (params?.url) searchParams.set("url", params.url);
    if (params?.userId) searchParams.set("userId", params.userId);
    if (params?.userName) searchParams.set("userName", params.userName);
    if (params?.userEmail) searchParams.set("userEmail", params.userEmail);
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
  return authenticatedApiRequest<PaginatedResponse<ImageResponseDto>>(
    `/admin/images${query ? `?${query}` : ""}`,
    token,
    {},
  );
}

export async function getImages(params?: ImageSearchParamsDto) {
  const token = await getLoginSessionOrRedirect();
  return findManyImages(token, params);
}
