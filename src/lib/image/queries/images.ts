"use server";
import { getLoginSessionOrRedirect } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cacheTag } from "next/cache";
import { ImageResponseDto } from "../schema";

const findAllImagesOwnedCached = async (jwtToken: string | null) => {
  "use cache";
  cacheTag("images");

  return authenticatedApiRequest<ImageResponseDto[]>(`/images/me`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

const findImageByIdCached = async (id: string, jwtToken: string) => {
  "use cache";
  cacheTag("images");
  cacheTag(`image-${id}`);

  return authenticatedApiRequest<ImageResponseDto>(`/images/${id}`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

export async function getAllImagesOwned() {
  const jwtToken = await getLoginSessionOrRedirect();
  return findAllImagesOwnedCached(jwtToken || null);
}

export async function findImageById(id: string) {
  const jwtToken = await getLoginSessionOrRedirect();
  return findImageByIdCached(id, jwtToken);
}
