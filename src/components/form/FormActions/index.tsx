import { useFormStatus } from "react-dom";

type FormActionsProps = {
  children: (pendind: boolean) => React.ReactNode;
};

export function FormActions({ children }: FormActionsProps) {
  const { pending } = useFormStatus();

  return <div className="flex gap-6">{children(pending)}</div>;
}
