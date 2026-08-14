"use server";
import {
  getLoginSession,
  requireLoginSessionOrRedirect,
} from "@/lib/login/manage-login";
import { ImageModel } from "@/models/image/image-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { internalApiRequest } from "@/utils/internal-api-request";
import { cacheTag } from "next/cache";

const findAllImagesCached = async () => {
  "use cache";
  cacheTag("images");

  return internalApiRequest<ImageModel[]>("/images", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const findAllImagesOwnedCached = async (jwtToken: string | null) => {
  "use cache";
  cacheTag("images");

  return authenticatedApiRequest<ImageModel[]>(`/images/me`, jwtToken, {
    headers: { "Content-Type": "application/json" },
  });
};

const findImageByIdCached = async (id: string) => {
  "use cache";
  cacheTag("images");
  cacheTag(`image-${id}`);

  return internalApiRequest<ImageModel>(`/images/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
};

export async function getAllImages() {
  await requireLoginSessionOrRedirect();
  return findAllImagesCached();
}

export async function getAllImagesOwned() {
  const jwtToken = await getLoginSession();
  if (!jwtToken) {
    throw new Error("Usuário não autenticado");
  }
  return findAllImagesOwnedCached(jwtToken || null);
}

export async function findImageById(id: string) {
  await requireLoginSessionOrRedirect();
  return findImageByIdCached(id);
}
