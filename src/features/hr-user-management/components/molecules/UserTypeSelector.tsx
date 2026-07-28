import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/shared/lib/utils";
import { UserRole } from "../../types/User";

interface UserTypeSelectorProps {
    value: UserRole | null;
    onChange: (role: UserRole) => void;
}

const roleOptions: { value: UserRole; label: string; description: string }[] = [
    { value: "COLABORADOR", label: "Colaborador", description: "Cadastro com e-mail corporativo WEG" },
    { value: "VISITANTE", label: "Visitante", description: "Cadastro com e-mail de sua preferência" },
    { value: "RH", label: "RH", description: "Acesso à gestão de usuários" },
    { value: "GUARITA", label: "Guarita", description: "Acesso ao controle de portaria" },
];

export function UserTypeSelector({ value, onChange }: UserTypeSelectorProps) {
    return (
        <RadioGroup
            value={value ?? undefined}
            onValueChange={(newValue) => onChange(newValue as UserRole)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            {roleOptions.map((option) => (
                <Label
                    key={option.value}
                    htmlFor={`role-${option.value}`}
                    className={cn(
                        "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                        value === option.value ? "border-primary bg-primary/5" : "border-input",
                    )}
                >
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value={option.value} id={`role-${option.value}`} />
                        <span className="font-medium">{option.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{option.description}</span>
                </Label>
            ))}
        </RadioGroup>
    );
}