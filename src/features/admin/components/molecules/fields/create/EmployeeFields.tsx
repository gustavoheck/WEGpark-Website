import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { CreateEmployeeFormValues } from "../../../../schemas/create/CreateUserSchema";

interface EmployeeFieldsProps {
    register: UseFormRegister<CreateEmployeeFormValues>;
    errors: FieldErrors<CreateEmployeeFormValues>;
}

export function EmployeeFields({ register, errors }: EmployeeFieldsProps) {
    return (
        <>
            <FormField text="crachá" id="badgeNumber" registration={register("badgeNumber")} error={errors.badgeNumber} />
            <FormField text="departamento" id="department" registration={register("department")} error={errors.department} />
        </>
    );
}