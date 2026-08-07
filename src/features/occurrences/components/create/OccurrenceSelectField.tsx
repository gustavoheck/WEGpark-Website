import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OccurrenceSelectFieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  options: Record<string, string>;
};

export default function OccurrenceSelectField({
  label,
  value,
  onChange,
  error,
  options,
}: OccurrenceSelectFieldProps) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>

      <Select
        value={value ?? null}
        onValueChange={(nextValue) => onChange(nextValue ?? "")}
      >
        <SelectTrigger className="w-full" aria-invalid={Boolean(error)}>
          <SelectValue placeholder="Selecione uma opção">
            {value ? (options[value] ?? value) : null}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {Object.entries(options).map(([optionValue, optionLabel]) => (
              <SelectItem key={optionValue} value={optionValue}>
                {optionLabel}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}
