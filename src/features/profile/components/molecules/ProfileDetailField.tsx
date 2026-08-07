import { cn } from "@/shared/lib/utils";

interface ProfileDetailFieldProps {
  label: string;
  value?: string | null;
  className?: string;
}

export function ProfileDetailField({
  label,
  value,
  className,
}: ProfileDetailFieldProps) {
  const displayedValue = value?.trim() || "Não informado";

  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border border-border/60 bg-muted/20 p-3.5",
        className,
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <p
        className="mt-1 truncate text-base font-semibold text-foreground"
        title={displayedValue}
      >
        {displayedValue}
      </p>
    </div>
  );
}
