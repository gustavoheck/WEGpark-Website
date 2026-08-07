export default function OccurrenceDetailsLabel({ text }: { text: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {text}
    </span>
  );
}
