export default function UserDetailsLabel({ text }: { text: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {text}
    </span>
  );
}
