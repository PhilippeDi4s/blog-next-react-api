import { QueryResult } from "@/lib/shared/types/query";
import { ImageResponseDto } from "../schema";


export type FetchImages = () => Promise<QueryResult<ImageResponseDto[]>>;
