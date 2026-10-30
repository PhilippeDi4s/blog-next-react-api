import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { PaginatedResponse } from "@/lib/shared/types/pagination";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { ImageResponseDto, ImageSearchParamsDto } from "../schema";
import { QueryResult } from "@/lib/shared/types/query";
import { toQueryResult } from "@/utils/to-query-result";

export async function findManyImages(
  token: string,
  params?: ImageSearchParamsDto,
): Promise<QueryResult<PaginatedResponse<ImageResponseDto>>> {
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
  const result = await authenticatedApiRequest<PaginatedResponse<ImageResponseDto>>(
    `/admin/images${query ? `?${query}` : ""}`,
    token,
    {},
  );
  return toQueryResult(result);
}

export async function findImageById(token: string, id: string): Promise<QueryResult<ImageResponseDto>> {
  const res = await findManyImages(token, { id });
  if (!res.success) return res;

  const image = res.data.data[0];

  if (!image) {
    return {
      success: false as const,
      errors: [{ code: "404", message: "Imagem não encontrado" }],
    };
  }

  return { success: true as const, data: image, errors: [] };
}

export async function getImages(params?: ImageSearchParamsDto): Promise<QueryResult<PaginatedResponse<ImageResponseDto>>> {
  const token = await getLoginSessionOrRedirect();
  return findManyImages(token, params);
}

export async function getImagesById(id: string): Promise<QueryResult<ImageResponseDto>> {
  const token = await getLoginSessionOrRedirect();
  return findImageById(token, id);
}
