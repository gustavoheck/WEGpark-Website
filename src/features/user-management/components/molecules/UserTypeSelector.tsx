import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { UserRole } from "../../types/User";

interface UserTypeSelectorProps {
  value: UserRole | null;
  onChange: (role: UserRole) => void;
}

const roleOptions: { value: UserRole; label: string; description: string }[] = [
  {
    value: "EMPLOYEE",
    label: "Colaborador",
    description: "Cadastro com e-mail corporativo WEG",
  },
  {
    value: "VISITOR",
    label: "Visitante",
    description: "Cadastro com e-mail de sua preferência",
  },
  { value: "HR", label: "RH", description: "Acesso à gestão de usuários" },
  {
    value: "GUARD",
    label: "Guarita",
    description: "Acesso ao controle de portaria",
  },
];

export function UserTypeSelector({ value, onChange }: UserTypeSelectorProps) {
  return (
    <div className="space-y-3 md:col-span-2">
      <div>
        <p className="text-sm font-medium text-foreground">Perfil de acesso</p>
        <p className="text-sm text-muted-foreground">
          Escolha as permissões e os dados complementares deste usuário.
        </p>
      </div>
      <RadioGroup
        value={value ?? ""}
        onValueChange={(newValue) => onChange(newValue as UserRole)}
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        {roleOptions.map((option) => (
          <Label
            key={option.value}
            htmlFor={`role-${option.value}`}
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
                id={`role-${option.value}`}
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
