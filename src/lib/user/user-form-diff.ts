import { AdminUpdateUserPayloadDto } from "./schemas";

export type UserFieldDiff = Partial<
  Record<keyof AdminUpdateUserPayloadDto, true>
>;

export function getUserFormDiff(
  original: AdminUpdateUserPayloadDto,
  current: AdminUpdateUserPayloadDto,
): UserFieldDiff {
  const changed: UserFieldDiff = {};

  (Object.keys(current) as (keyof AdminUpdateUserPayloadDto)[]).forEach(
    (key) => {
      if (original[key] !== current[key]) {
        changed[key] = true;
      }
    },
  );

  return changed;
}
