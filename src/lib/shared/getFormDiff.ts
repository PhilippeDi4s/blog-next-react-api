export type FieldDiff<T> = Partial<Record<keyof T, true>>;

export function getFormDiff<T extends Record<string, unknown>>(
  original: T,
  current: T,
): FieldDiff<T> {
  const changed: FieldDiff<T> = {};
  (Object.keys(current) as (keyof T)[]).forEach((key) => {
    if (original[key] !== current[key]) changed[key] = true;
  });
  return changed;
}
