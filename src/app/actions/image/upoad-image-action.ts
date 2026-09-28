"use server";

import { validateActionRequest } from "@/lib/auth/validate-action-request";
import { ImageResponseDto } from "@/lib/image/schema";
import { ActionResult } from "@/lib/shared/adminAction";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

type ImageActionResult = ActionResult & {
  url: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<ImageActionResult> {
  const validation = await validateActionRequest();

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      url: "",
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      success: false,
      errors: [{ code: "INVALID_DATA", message: "Dados inválidos" }],
      url: "",
    };
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      success: false,
      errors: [{ code: "INVALID_FILE", message: "Dados inválidos" }],
      url: "",
    };
  }

  const allowedTypesEnv = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES;

  if (!allowedTypesEnv) {
    console.error("NEXT_PUBLIC_ALLOWED_IMAGE_TYPES não foi configurada");
    return {
      success: false,
      errors: [
        {
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro de configuração do servidor",
        },
      ],
      url: "",
    };
  }

  const allowedTypes = allowedTypesEnv.split(",").map((type) => type.trim());

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      errors: [
        { code: "INVALID_IMAGE_FORMAT", message: "Formato não permitido" },
      ],
      url: "",
    };
  }

  const imageMaxUploadSize = Number(
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE || 921600,
  );

  if (file.size > imageMaxUploadSize) {
    return {
      success: false,
      errors: [{ code: "INVALID_IMAGE", message: "Arquivo muito grande" }],
      url: "",
    };
  }

  const res = await authenticatedApiRequest<ImageResponseDto>(
    "/upload",
    validation.token,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.success) {
    return {
      success: false,
      errors: res.errors,
      url: "",
    };
  }

  const savedImage = res.data;

  return {
    success: true,
    errors: [{ code: "", message: "" }],
    url: `${savedImage.url}`,
  };
}
