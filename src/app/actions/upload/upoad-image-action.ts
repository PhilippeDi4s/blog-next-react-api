"use server";

import { getLoginSession } from "@/lib/login/manage-login";
import { ImageModel } from "@/models/image/image-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const jwtToken = await getLoginSession();
  if (!jwtToken) {
    return { url: "", error: "Faça login em outra aba antes de salvar." };
  }
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  const allowedTypesEnv = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES;

  if (!allowedTypesEnv) {
    console.error("NEXT_PUBLIC_ALLOWED_IMAGE_TYPES não foi configurada");
    return makeResult({ error: "Erro de configuração do servidor" });
  }

  const allowedTypes = allowedTypesEnv.split(",").map((type) => type.trim());

  if (!allowedTypes.includes(file.type)) {
    return makeResult({ error: "Formato não permitido" });
  }

  const imageMaxUploadSize = Number(
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE || 921600,
  );

  if (file.size > imageMaxUploadSize) {
    return makeResult({ error: "Arquivo muito grande" });
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
    return makeResult({ error: "Não foi possível conectar ao servidor." });
  }

  const savedImage: ImageModel = uploadImageRes.data;

  revalidateTag("images", "max");
  return makeResult({ url: `${savedImage.url}` });
}
