import { UseFormRegister, FieldErrors } from "react-hook-form";
import { EmployeeFormValues } from "../schemas/register-schema";
import FormField from "@/shared/components/atoms/FormField";

interface EmployeeFieldsProps {
    register: UseFormRegister<EmployeeFormValues>;
    errors: FieldErrors<EmployeeFormValues>;
}

export function EmployeeFields({ register, errors }: EmployeeFieldsProps) {
    return (
        <>
            <FormField 
                text="setor"
                id="department"
                registration={register("department")}
                error={errors.department}
            />
            <FormField 
                text="crachá"
                id="name-tag-number"
                registration={register("nameTagNumber")}
                error={errors.nameTagNumber}
            />
        </>
    );
}