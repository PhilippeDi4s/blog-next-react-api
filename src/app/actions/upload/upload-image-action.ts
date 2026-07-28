"use server";
import cloudinary from "@/lib/cloudinary";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
// import { mkdir, writeFile } from "fs/promises";
// import { extname, resolve } from "path";
// import sharp from "sharp";

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = "", error = "" }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Arquivo inválido" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const type = await fileTypeFromBuffer(buffer);

  if (!type) {
    return makeResult({ error: "Arquivo inválido ou corrompido" });
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedTypes.includes(type.mime)) {
    return makeResult({ error: "Formato não permitido" });
  }

  const imageMaxUploadSize = Number(
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE || 921600,
  );

  if (file.size > imageMaxUploadSize) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  const safeBuffer = await sharp(buffer).resize(800).toFormat("png").toBuffer();

  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error || !result) {
          resolve(
            makeResult({
              error: "Não foi possível enviar a imagem ao servidor",
            }),
          );
          console.log(error)
          return;
        }
        resolve(makeResult({ error: "", url: result.secure_url }));
      },
    );
    stream.end(safeBuffer);
  });
}
