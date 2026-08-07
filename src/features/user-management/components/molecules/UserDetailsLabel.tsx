import UserDetailsLabel from "../atoms/UserDetailsLabel";

interface DetailUserInformationProps {
  label: string;
  data: string;
}

export default function DetailUserInformation({
  label,
  data,
}: DetailUserInformationProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
      <UserDetailsLabel text={label} />
      <p className="mt-1 text-base font-semibold text-foreground">{data}</p>
    </div>
  );
}
