import { z } from "zod";

type DateRange<T> = {
  start: keyof T & string;
  end: keyof T & string;
  message?: string;
};

export function withDateRanges<T extends z.ZodType<Record<string, unknown>>>(
  schema: T,
  ranges: DateRange<z.output<T>>[],
) {
  return schema.superRefine((data, ctx) => {
    for (const { start, end, message } of ranges) {
      const from = data[start];
      const to = data[end];

      if (from instanceof Date && to instanceof Date && from > to) {
        ctx.addIssue({
          code: "custom",
          path: [end],
          message:
            message ?? "A data final não pode ser anterior à data inicial",
        });
      }
    }
  });
}
