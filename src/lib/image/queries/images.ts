"use server";
import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";
import { ImageResponseDto } from "../schema";
import { QueryResult } from "@/lib/shared/types/query";
import { toQueryResult } from "@/utils/to-query-result";

const findAllImagesOwnedCached = async (jwtToken: string | null): Promise<QueryResult<ImageResponseDto[]>> => {
  "use cache";
  cacheTag("images");

  const result = await authenticatedApiRequest<ImageResponseDto[]>(`/images/me`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
  return toQueryResult(result);
};

const findImageByIdCached = async (id: string, jwtToken: string): Promise<QueryResult<ImageResponseDto>> => {
  "use cache";
  cacheTag("images");
  cacheTag(`image-${id}`);

  const result = await authenticatedApiRequest<ImageResponseDto>(`/images/${id}`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
  return toQueryResult(result);
};

export async function getAllImagesOwned(): Promise<QueryResult<ImageResponseDto[]>> {
  const jwtToken = await getLoginSessionOrRedirect();
  return findAllImagesOwnedCached(jwtToken || null);
}

export async function findImageById(id: string): Promise<QueryResult<ImageResponseDto>> {
  const jwtToken = await getLoginSessionOrRedirect();
  return findImageByIdCached(id, jwtToken);
}
