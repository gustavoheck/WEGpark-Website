import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { OCCURRENCE_UI } from "../../constants/occurence-ui";
import type { OccurrenceType } from "../../enums/occurrence-type";

const options: { value: OccurrenceType; label: string; description: string }[] =
  [
    {
      value: "WARNING",
      label: OCCURRENCE_UI.WARNING.label,
      description: "Registre um aviso relacionado ao veículo.",
    },
    {
      value: "ILLEGAL_PARKING",
      label: OCCURRENCE_UI.ILLEGAL_PARKING.label,
      description: "Registre o uso indevido de uma vaga.",
    },
    {
      value: "TRAFFIC_ACCIDENT",
      label: OCCURRENCE_UI.TRAFFIC_ACCIDENT.label,
      description: "Registre informações sobre um sinistro.",
    },
  ];
export function OccurrenceTypeSelector({
  value,
  onChange,
}: {
  value?: OccurrenceType;
  onChange: (value: OccurrenceType) => void;
}) {
  return (
    <div className="space-y-3 md:col-span-2">
      <p className="text-sm font-medium">Tipo da ocorrência</p>
      <RadioGroup
        value={value ?? ""}
        onValueChange={(newValue) => onChange(newValue as OccurrenceType)}
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        {options.map((option) => (
          <Label
            key={option.value}
            htmlFor={`occurrence-${option.value}`}
            className={cn(
              "flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-colors hover:bg-muted/50",
              value === option.value
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-input",
            )}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value={option.value}
                id={`occurrence-${option.value}`}
              />
              <span className="font-medium">{option.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {option.description}
            </span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
