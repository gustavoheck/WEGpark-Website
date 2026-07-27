import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { EmployeeProfileFormValues } from "../../schemas/ProfileSchema";

interface EmployeeProfileFieldsProps {
    register: UseFormRegister<EmployeeProfileFormValues>;
    errors: FieldErrors<EmployeeProfileFormValues>;
}

export function EmployeeProfileFields({ register, errors }: EmployeeProfileFieldsProps) {
    return (
        <>
            <FormField
                text="setor"
                id="department"
                registration={register("department")}
                error={errors.department}
            />
            <FormField
                text="número do crachá"
                id="badgeNumber"
                type="number"
                registration={register("badgeNumber")}
                error={errors.badgeNumber}
            />
        </>
    );
}