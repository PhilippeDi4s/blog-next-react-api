export type UserFormData = {
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  forceLogout: boolean;
  deletedAt: string | null;
};

export const SENSITIVE_FIELDS = [
  "role",
  "isBlocked",
  "forceLogout",
  "deletedAt",
] as const;

export type UserFieldDiff = Partial<Record<keyof UserFormData, true>>;

export function getUserFormDiff(
  original: UserFormData,
  current: UserFormData,
): UserFieldDiff {
  const changed: UserFieldDiff = {};

  (Object.keys(current) as (keyof UserFormData)[]).forEach((key) => {
    if (original[key] !== current[key]) {
      changed[key] = true;
    }
  });

  return changed;
}

export function hasSensitiveChanges(changed: UserFieldDiff): boolean {
  return SENSITIVE_FIELDS.some((field) => changed[field]);
}
