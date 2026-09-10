"use server";

import { getLoginSession } from "@/lib/auth/session";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { url } from "inspector";
import { revalidateTag } from "next/cache";

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const jwtToken = await getLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      error: "Dados inválidos",
      url: "",
    };
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      error: "Arquivo inválido",
      url: "",
    };
  }

  const allowedTypesEnv = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES;

  if (!allowedTypesEnv) {
    console.error("NEXT_PUBLIC_ALLOWED_IMAGE_TYPES não foi configurada");
    return {
      error: "Erro de configuração do servidor",
      url: "",
    };
  }

  const allowedTypes = allowedTypesEnv.split(",").map((type) => type.trim());

  if (!allowedTypes.includes(file.type)) {
    return {
      error: "Formato não permitido",
      url: "",
    };
  }

  const imageMaxUploadSize = Number(
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE || 921600,
  );

  if (file.size > imageMaxUploadSize) {
    return {
      error: "Arquivo muito grande",
      url: "",
    };
  }

  const uploadImageRes = await authenticatedApiRequest<ImageModel>(
    "/upload",
    jwtToken,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!uploadImageRes.success) {
    return {
      error: "Não foi possivél conectar ao servidor",
      url: "",
    };
  }

  const savedImage: ImageModel = uploadImageRes.data;

  revalidateTag("images", "max");
  return {
    error: "",
    url: `${savedImage.url}`,
  };
}
