import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";

type DetailValue =
  string | { defaults?: { name?: string } | null } | null | undefined;

type DetailOccurrenceInformationProps = {
  label: string;
  data: DetailValue;
};

export default function DetailOccurrenceInformation({
  label,
  data,
}: DetailOccurrenceInformationProps) {
  const value =
    typeof data === "string" ? data : (data?.defaults?.name ?? "Não informado");

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
      <OccurrenceDetailsLabel text={label} />
      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
