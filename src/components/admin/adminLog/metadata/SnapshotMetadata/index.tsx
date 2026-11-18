import { InputText } from "@/components/ui/InputText";

type SnapshotMetadataProps = {
  metadata: Record<string, unknown>;
};

export function SnapshotMetadata({ metadata }: SnapshotMetadataProps) {
  return (
    <>
      {Object.entries(metadata).map(([key, value]) => (
        <InputText labelText={key} key={key} value={String(value)} disabled />
      ))}
    </>
  );
}
