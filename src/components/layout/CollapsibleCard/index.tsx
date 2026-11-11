import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { twMerge } from "tailwind-merge";

type CollapsibleCardProps = {
  className?: string;
  toggleBtnContent: React.ReactNode;
  children: React.ReactNode;
};

export async function CollapsibleCard({
  toggleBtnContent,
  className,
  children,
}: CollapsibleCardProps) {
  return (
    <CollapsibleSection
      btnVariant="unstyled"
      toggleBtnContent={toggleBtnContent}
      toggleBtnClassName="p-0 text-2xl font-extrabold w-fit"
      className={twMerge(`w-full bg-slate-800 rounded-3xl p-5 ${className}`)}
    >
      {children}
    </CollapsibleSection>
  );
}
