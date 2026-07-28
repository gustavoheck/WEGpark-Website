import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { CreateHRFormValues } from "../../schemas/CreateUserSchema";

interface HRFieldsProps {
    register: UseFormRegister<CreateHRFormValues>;
    errors: FieldErrors<CreateHRFormValues>;
}

export function HRFields({ register, errors }: HRFieldsProps) {
    return <FormField text="crachá" id="badgeNumber" registration={register("badgeNumber")} error={errors.badgeNumber} />;
}