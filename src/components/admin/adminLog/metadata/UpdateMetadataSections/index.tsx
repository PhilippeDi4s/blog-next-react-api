import {
  sectionClassName,
  toggleBtnClassName,
} from "@/components/admin/adminLog/logSectionStyles";
import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { getChangedKeys } from "@/lib/logs/utils/getChangedKeys";

export type DiffVariant = "before" | "after";

type UpdateMetadataSectionsProps<T extends object> = {
  before: Partial<T>;
  after: Partial<T>;
  renderFields: (
    snapshot: Partial<T>,
    variant: DiffVariant,
    changedKeys: ReadonlySet<string>,
  ) => React.ReactNode;
};

export function getDiffClassName(
  variant: DiffVariant,
  isChanged: boolean,
): string {
  if (!isChanged) return "";
  return variant === "before"
    ? "rounded-lg bg-red-500/15 ring-1 ring-red-500/40 p-2"
    : "rounded-lg bg-green-500/15 ring-1 ring-green-500/40 p-2";
}

export function UpdateMetadataSections<T extends object>({
  before,
  after,
  renderFields,
}: UpdateMetadataSectionsProps<T>) {
  const changedKeys = getChangedKeys(before, after);

  return (
    <>
      <CollapsibleSection
        toggleBtnContent={<>Antes</>}
        className={sectionClassName}
        toggleBtnClassName={toggleBtnClassName}
      >
        {renderFields(before, "before", changedKeys)}
      </CollapsibleSection>
      <CollapsibleSection
        toggleBtnContent={<>Depois</>}
        className={sectionClassName}
        toggleBtnClassName={toggleBtnClassName}
      >
        {renderFields(after, "after", changedKeys)}
      </CollapsibleSection>
    </>
  );
}
