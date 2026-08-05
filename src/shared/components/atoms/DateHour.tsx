export default function DateHour({ dateHour }: { dateHour: string }) {
  const date = new Date(dateHour);
  const formatted = date.toLocaleString("pt-BR");
  const formattedDate = formatted.substring(0, 10);
  const formattedTime = formatted.substring(12, 17);

  return (
    <time
      dateTime={dateHour}
      className="flex flex-wrap items-baseline gap-1 text-xs text-muted-foreground"
    >
      <span className="font-bold text-foreground">{formattedDate}</span>
      <span>às {formattedTime}</span>
    </time>
  );
}
