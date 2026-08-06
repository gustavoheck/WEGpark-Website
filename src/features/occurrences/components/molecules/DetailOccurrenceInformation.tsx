import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";

type DetailValue = string | { defaults: { name: string } } | null | undefined;

type DetailOccurrenceInformationProps = {
  label: string;
  data: DetailValue;
};

export default function DetailOccurrenceInformation({
  label,
  data,
}: DetailOccurrenceInformationProps) {
  const value =
    typeof data === "string" ? data : (data?.defaults.name ?? "Nao informado");

  return (
    <div>
      <OccurrenceDetailsLabel text={label} />
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}
