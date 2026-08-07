import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";

type DetailValue =
  | string
  | { defaults?: { name?: string } | null }
  | null
  | undefined;

type DetailOccurrenceInformationProps = {
  label: string;
  data: DetailValue;
};

export default function DetailOccurrenceInformation({
  label,
  data,
}: DetailOccurrenceInformationProps) {
  const value =
    typeof data === "string"
      ? data
      : (data?.defaults?.name ?? "Não informado");

  return (
    <div>
      <OccurrenceDetailsLabel text={label} />
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}
