import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { UpdateHRFormValues } from "@/features/hr-user-management/schemas/update/UpdateUserSchema";

interface HRUpdateFieldsProps {
    register: UseFormRegister<UpdateHRFormValues>;
    errors: FieldErrors<UpdateHRFormValues>;
}

export function HRUpdateFields({ register, errors }: HRUpdateFieldsProps) {
    return <FormField text="crachá" id="badgeNumber" registration={register("badgeNumber")} error={errors.badgeNumber} />;
}