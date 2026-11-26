import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { twMerge } from "tailwind-merge";

type CollapsibleCardProps = {
  className?: string;
  toggleBtnContent: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export async function CollapsibleCard({
  toggleBtnContent,
  className,
  children,
  defaultOpen = false,
}: CollapsibleCardProps) {
  return (
    <CollapsibleSection
      btnVariant="unstyled"
      toggleBtnContent={toggleBtnContent}
      toggleBtnClassName="p-0 text-2xl font-semibold w-fit"
      className={twMerge(`w-full bg-slate-800 rounded-3xl p-5 ${className}`)}
      defaultOpen={defaultOpen}
    >
      {children}
    </CollapsibleSection>
  );
}
