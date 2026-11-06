"use server";

import { getAllImagesOwned } from "@/lib/image/queries/images";

export async function getAllImagesOwnedAction(page: number) {
  return getAllImagesOwned(page);
}