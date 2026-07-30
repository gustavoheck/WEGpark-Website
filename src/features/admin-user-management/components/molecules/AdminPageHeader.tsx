import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

interface AdminPageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function AdminPageHeader({ title, showBackButton = false }: AdminPageHeaderProps) {
  return (
    <div className="relative flex items-center justify-center py-8">
      {showBackButton ? <BackButton /> : null}
      <SectionTitle text={title} className="py-0" />
    </div>
  );
}