import { cn } from "@/shared/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ParkUserType } from "@/shared/enum/ParkUserType";

interface  ParkUserTypeSelectorProps {
    value: ParkUserType | null;
    onChangeParkUser: (type: ParkUserType) => void;
}

export function  ParkUserTypeSelector({ value, onChangeParkUser }:  ParkUserTypeSelectorProps) {
    return (
        <RadioGroup
            value={value ?? ""}
            onValueChange={(newValue) => onChangeParkUser(newValue as ParkUserType)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            <Label
                htmlFor="type-collaborator"
                className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                    value === "COLLABORATOR" ? "border-primary bg-primary/5" : "border-input"
                )}
            >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="COLLABORATOR" id="type-collaborator" />
                    <span className="font-medium">Colaboradores</span>
                </div>
                <span className="text-sm text-muted-foreground">
                    Cadastro com e-mail corporativo WEG
                </span>
            </Label>

            <Label
                htmlFor="type-visitor"
                className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                    value === "VISITOR" ? "border-primary bg-primary/5" : "border-input"
                )}
            >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="VISITOR" id="type-visitor" />
                    <span className="font-medium">Visitantes</span>
                </div>
                <span className="text-sm text-muted-foreground">
                    Cadastro com e-mail de sua preferência
                </span>
            </Label>
        </RadioGroup>
    );
}
