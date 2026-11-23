export function getChangedKeys<T extends object>(
  before: Partial<T>,
  after: Partial<T>,
): Set<string> {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const changedKeys = new Set<string>();

  for (const key of keys) {
    const beforeValue = (before as Record<string, unknown>)[key] ?? null;
    const afterValue = (after as Record<string, unknown>)[key] ?? null;
    const beforeIsObject = typeof beforeValue === "object" && beforeValue !== null;
    const afterIsObject = typeof afterValue === "object" && afterValue !== null;

    const hasChanged =
      beforeIsObject || afterIsObject
        ? JSON.stringify(beforeValue) !== JSON.stringify(afterValue)
        : beforeValue !== afterValue;

    if (hasChanged) changedKeys.add(key);
  }

  return changedKeys;
}
