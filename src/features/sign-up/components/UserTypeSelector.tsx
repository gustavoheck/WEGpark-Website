import { cn } from "@/shared/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserType } from "../types/register";

interface UserTypeSelectorProps {
    value: UserType | null;
    onChange: (type: UserType) => void;
}

export function UserTypeSelector({ value, onChange }: UserTypeSelectorProps) {
    return (
        <RadioGroup
            value={value ?? undefined}
            onValueChange={(newValue) => onChange(newValue as UserType)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            <Label
                htmlFor="type-colaborador"
                className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                    value === "COLABORADOR" ? "border-primary bg-primary/5" : "border-input",
                )}
            >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="COLABORADOR" id="type-colaborador" />
                    <span className="font-medium">Colaboradores</span>
                </div>
                <span className="text-sm text-muted-foreground">
                    Cadastro com e-mail corporativo WEG
                </span>
            </Label>

            <Label
                htmlFor="type-visitante"
                className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                    value === "VISITANTE" ? "border-primary bg-primary/5" : "border-input",
                )}
            >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="VISITANTE" id="type-visitante" />
                    <span className="font-medium">Visitantes</span>
                </div>
                <span className="text-sm text-muted-foreground">
                    Cadastro com e-mail de sua preferência
                </span>
            </Label>
        </RadioGroup>
    );
}