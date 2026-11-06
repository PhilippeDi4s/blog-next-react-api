import { QueryResult } from "@/lib/shared/types/query";
import { ImageResponseDto } from "../schema";
import { PaginatedResponse } from "@/lib/shared/types/pagination";

export type FetchImages = (
  page: number,
) => Promise<QueryResult<PaginatedResponse<ImageResponseDto>>>;