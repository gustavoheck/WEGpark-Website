import OccurrenceDetailsLabel from "../atoms/OccurrenceDetailsLabel";

type DetailValue = string | { defaults: { name: string } };

interface DetailOccurrenceInformationProps { label: string; data: DetailValue; }

export default function DetailOccurrenceInformation({ label, data }: DetailOccurrenceInformationProps) {
  const value = typeof data === "string" ? data : data.defaults.name;
  return <div><OccurrenceDetailsLabel text={label} /><p className="font-semibold text-base">{value}</p></div>;
}
