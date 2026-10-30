import { FieldError } from "./error";

export type QueryResult<TData> =
  | { success: true; data: TData; errors: FieldError[] }
  | { success: false; data?: undefined; errors: FieldError[] };
