"use server";

import { getImages } from "@/lib/image/queries/admin-image";

export async function getAllImagesAdminAction() {
  return await getImages();
}
