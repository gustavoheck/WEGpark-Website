import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { UpdateEmployeeFormValues } from "../../../../schemas/update/UpdateUserSchema";

interface EmployeeUpdateFieldsProps {
    register: UseFormRegister<UpdateEmployeeFormValues>;
    errors: FieldErrors<UpdateEmployeeFormValues>;
}

export function EmployeeUpdateFields({ register, errors }: EmployeeUpdateFieldsProps) {
    return (
        <>
            <FormField text="crachá" id="badgeNumber" registration={register("badgeNumber")} error={errors.badgeNumber} />
            <FormField text="departamento" id="department" registration={register("department")} error={errors.department} />
        </>
    );
}